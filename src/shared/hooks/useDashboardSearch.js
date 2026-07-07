import { useEffect, useMemo, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const MIN_QUERY_LENGTH = 2;

const getSearchUrl = (params) => {
  const base = API_BASE_URL.replace(/\/$/, '');
  return `${base}/search?${params.toString()}`;
};

const createEmptySearchData = ({ query = '', type = 'all', projectId = null, page = 1, limit = 10 } = {}) => ({
  query,
  type,
  projectId,
  page,
  limit,
  total: 0,
  totalPages: 0,
  counts: {},
  items: [],
});

const toTypeLabel = (type = '') => {
  const labels = {
    article: 'Bài báo',
    journal: 'Tạp chí',
    author: 'Tác giả',
    institution: 'Tổ chức',
    keyword: 'Từ khóa',
    topic: 'Chủ đề',
  };

  return labels[type] || type || 'Result';
};

const toTypeIcon = (type = '') => {
  const icons = {
    article: 'file-text',
    journal: 'book-open',
    author: 'user',
    institution: 'building-2',
    keyword: 'tag',
    topic: 'network',
  };

  return icons[type] || type || 'search';
};

const toDetailPath = (type, id) => {
  if (!type || !id) return null;

  const paths = {
    article: 'articles',
    journal: 'journals',
    author: 'authors',
    institution: 'institutions',
    keyword: 'keywords',
    topic: 'topics',
  };

  return paths[type] ? `/${paths[type]}/${id}` : null;
};

const normalizeSearchItem = (item = {}) => {
  const type = item.type || 'result';
  const id = String(item.id ?? item.rank ?? item.title ?? `${type}-result`);

  return {
    id,
    rank: item.rank ?? null,
    type,
    typeLabel: item.typeLabel || item.type_label || toTypeLabel(type),
    typeIcon: item.typeIcon || item.type_icon || toTypeIcon(type),
    title: item.title || item.name || 'Untitled result',
    subtitle: item.subtitle || null,
    description: item.description || null,
    snippet: item.snippet || null,
    imageUrl: item.imageUrl || item.image_url || null,
    detailPath: item.detailPath || item.detail_path || toDetailPath(type, id),
    publicationYear: item.publicationYear ?? item.publication_year ?? null,
    citationCount: item.citationCount ?? item.citation_count ?? 0,
    score: item.score ?? null,
    badges: Array.isArray(item.badges) ? item.badges : [],
    stats: Array.isArray(item.stats) ? item.stats : [],
    metadata: item.metadata || {},
  };
};

const dedupeItems = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.type}-${item.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const normalizeFullPayload = (payload, fallback) => {
  const data = payload?.data || payload || {};
  const rawItems = Array.isArray(data.items)
    ? data.items
    : Array.isArray(data.suggestions)
      ? data.suggestions
      : [];

  return {
    query: data.query ?? fallback.query,
    type: data.type ?? fallback.type,
    projectId: data.projectId ?? data.project_id ?? fallback.projectId ?? null,
    page: data.page ?? fallback.page,
    limit: data.limit ?? fallback.limit,
    total: data.total ?? rawItems.length,
    totalPages: data.totalPages ?? data.total_pages ?? 1,
    counts: data.counts || {},
    items: rawItems.map(normalizeSearchItem),
  };
};

const mergeStreamPayload = (payload, fallback, previous) => {
  const data = payload?.data || payload || {};
  const nextBase = {
    ...previous,
    query: data.query ?? previous.query ?? fallback.query,
    type: data.type ?? previous.type ?? fallback.type,
    projectId: data.projectId ?? data.project_id ?? previous.projectId ?? fallback.projectId ?? null,
    page: data.page ?? previous.page ?? fallback.page,
    limit: data.limit ?? previous.limit ?? fallback.limit,
    total: data.total ?? previous.total,
    totalPages: data.totalPages ?? data.total_pages ?? previous.totalPages,
    counts: data.counts || previous.counts || {},
  };

  if (Array.isArray(data.items)) {
    const incomingItems = data.items.map(normalizeSearchItem);
    const shouldReplace = Boolean(data.total || data.totalPages || data.counts || data.page);
    return {
      ...nextBase,
      items: shouldReplace ? incomingItems : dedupeItems([...previous.items, ...incomingItems]),
    };
  }

  if (Array.isArray(data.suggestions)) {
    return {
      ...nextBase,
      items: data.suggestions.map(normalizeSearchItem),
    };
  }

  const streamedItem = data.item || payload?.item;
  if (streamedItem) {
    return {
      ...nextBase,
      total: data.total ?? Math.max(previous.total, previous.items.length + 1),
      items: dedupeItems([...previous.items, normalizeSearchItem(streamedItem)]),
    };
  }

  return nextBase;
};

const parseStreamLine = (line) => {
  const trimmed = line.trim();
  if (!trimmed) return null;

  const payload = trimmed.startsWith('data:')
    ? trimmed.slice(5).trim()
    : trimmed;

  if (!payload || payload === '[DONE]') return null;

  try {
    return JSON.parse(payload);
  } catch {
    return null;
  }
};

export const useDashboardSearchQuery = (query, type = 'all', options = {}) => {
  const {
    projectId,
    page = 1,
    limit = 10,
    fromYear,
    toYear,
    sort = 'relevance',
    debounceMs = 250,
    enabled = true,
  } = options;

  const [debouncedQuery, setDebouncedQuery] = useState(query.trim());
  const [data, setData] = useState(() => createEmptySearchData({ query, type, projectId, page, limit }));
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, debounceMs);

    return () => window.clearTimeout(timeoutId);
  }, [query, debounceMs]);

  const fallback = useMemo(() => ({
    query: debouncedQuery,
    type,
    projectId: projectId ?? null,
    page,
    limit,
  }), [debouncedQuery, type, projectId, page, limit]);

  useEffect(() => {
    if (!enabled || debouncedQuery.length < MIN_QUERY_LENGTH) {
      setData(createEmptySearchData(fallback));
      setIsLoading(false);
      setIsStreaming(false);
      setError(null);
      return undefined;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      q: debouncedQuery,
      type,
      page: String(page),
      limit: String(limit),
      sort,
    });

    if (projectId) params.set('project_id', String(projectId));
    if (fromYear) params.set('from_year', String(fromYear));
    if (toYear) params.set('to_year', String(toYear));

    const token = localStorage.getItem('accessToken');
    const headers = {
      Accept: 'application/json, text/event-stream, application/x-ndjson',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const runSearch = async () => {
      setData(createEmptySearchData(fallback));
      setIsLoading(true);
      setIsStreaming(true);
      setError(null);

      try {
        const response = await fetch(getSearchUrl(params), {
          method: 'GET',
          credentials: 'include',
          headers,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Search request failed (${response.status})`);
        }

        const contentType = response.headers.get('content-type') || '';
        const isJsonResponse = contentType.includes('application/json');

        if (!response.body || isJsonResponse) {
          const payload = await response.json();
          if (controller.signal.aborted) return;
          setData(normalizeFullPayload(payload, fallback));
          setIsLoading(false);
          setIsStreaming(false);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let hasReceivedChunk = false;

        while (!controller.signal.aborted) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() || '';

          lines.forEach((line) => {
            const payload = parseStreamLine(line);
            if (!payload) return;

            hasReceivedChunk = true;
            setData((previous) => mergeStreamPayload(payload, fallback, previous));
          });

          if (hasReceivedChunk) {
            setIsLoading(false);
          }
        }

        buffer += decoder.decode();
        const lastPayload = parseStreamLine(buffer);
        if (lastPayload && !controller.signal.aborted) {
          setData((previous) => mergeStreamPayload(lastPayload, fallback, previous));
        }

        if (!controller.signal.aborted) {
          setIsLoading(false);
          setIsStreaming(false);
        }
      } catch (searchError) {
        if (controller.signal.aborted) return;
        setError(searchError);
        setIsLoading(false);
        setIsStreaming(false);
      }
    };

    runSearch();

    return () => controller.abort();
  }, [debouncedQuery, type, projectId, page, limit, fromYear, toYear, sort, enabled, fallback]);

  return {
    data: data.items,
    searchData: data,
    counts: data.counts,
    total: data.total,
    totalPages: data.totalPages,
    isLoading,
    isStreaming,
    error,
  };
};
