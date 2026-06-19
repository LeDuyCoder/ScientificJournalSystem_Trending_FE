const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const ARTICLE_GRAPH_ENDPOINT =
  import.meta.env.VITE_ARTICLE_GRAPH_ENDPOINT || '/articles/search/graph';

export async function searchArticlesGraph({ keyword = 'graph', limit = 50 } = {}) {
  const params = new URLSearchParams();

  params.set('keyword', String(keyword || '').trim());
  params.set('limit', String(Number(limit) || 50));

  const url = `${API_BASE_URL}${ARTICLE_GRAPH_ENDPOINT}?${params.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorBody = await response.json();
      message = errorBody?.message || errorBody?.error || message;
    } catch {
      // ignore parse error
    }

    throw new Error(message);
  }

  const data = await response.json();

  const payload =
    data?.data && (Array.isArray(data.data.nodes) || Array.isArray(data.data.relationships))
      ? data.data
      : data;

  return {
    source: payload?.source || 'neo4j',
    nodes: Array.isArray(payload?.nodes) ? payload.nodes : [],
    relationships: Array.isArray(payload?.relationships)
      ? payload.relationships
      : [],
  };
}