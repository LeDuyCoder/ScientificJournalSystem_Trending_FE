export const ARTICLE_GRAPH_THEME = {
  bg: '#ffffff',

  linkColor: 'rgba(120, 65, 20, 0.14)',
  linkActiveColor: 'rgba(234, 88, 12, 0.45)',

  yearStartColor: '#fed7aa',
  yearEndColor: '#ea580c',

  selectedRing: 'rgba(249, 115, 22, 0.95)',
  selectedGlow: 'rgba(251, 146, 60, 0.26)',

  textColor: '#7c2d12',
  selectedTextColor: '#c2410c',
};

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function interpolateColor(hex1, hex2, ratio) {
  const a = hexToRgb(hex1);
  const b = hexToRgb(hex2);
  const t = clamp(ratio, 0, 1);

  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);

  return `rgb(${r}, ${g}, ${bl})`;
}

export function toRgba(color, alpha) {
  if (color.startsWith('#')) {
    const { r, g, b } = hexToRgb(color);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const nums = color.match(/\d+/g)?.map(Number) || [234, 88, 12];
  return `rgba(${nums[0]}, ${nums[1]}, ${nums[2]}, ${alpha})`;
}

export function getId(value) {
  if (value && typeof value === 'object') return String(value.id);
  return String(value);
}

export function compactText(value, max = 16) {
  const text = String(value || '');
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export function getYearFromNode(node) {
  const raw =
    node?.properties?.publication_year ??
    node?.properties?.year ??
    node?.publication_year ??
    node?.year;

  const year = Number(raw);
  return Number.isFinite(year) ? year : null;
}

export function getArticleGraphUrlParams() {
  if (typeof window === 'undefined') {
    return {
      keyword: 'graph',
      limit: 50,
    };
  }

  const params = new URLSearchParams(window.location.search);

  const keyword =
    params.get('keyword') ||
    params.get('q') ||
    params.get('search') ||
    'graph';

  const limitRaw = Number(params.get('limit'));
  const limit = Number.isFinite(limitRaw) ? clamp(limitRaw, 1, 500) : 50;

  return {
    keyword: String(keyword).trim(),
    limit,
  };
}

export function getDisplayLabel(properties, fallbackId) {
  const year = properties?.publication_year || properties?.year;

  const author =
    properties?.display_label ||
    properties?.label ||
    properties?.name ||
    properties?.first_author ||
    properties?.firstAuthor ||
    properties?.author ||
    properties?.author_name;

  if (author && year && !String(author).includes(String(year))) {
    return `${author}, ${year}`;
  }

  if (author) return String(author);

  if (properties?.title) return String(properties.title);

  return String(properties?.id ?? fallbackId);
}

export function getNodeColor(node, minYear, maxYear) {
  const year = getYearFromNode(node);

  if (!year) {
    return 'rgb(190, 120, 55)';
  }

  const range = Math.max(1, maxYear - minYear);
  const ratio = (year - minYear) / range;

  return interpolateColor(
    ARTICLE_GRAPH_THEME.yearStartColor,
    ARTICLE_GRAPH_THEME.yearEndColor,
    ratio
  );
}

export function isArticleNode(node) {
  const labels = Array.isArray(node?.labels)
    ? node.labels.map((x) => String(x).toLowerCase())
    : [];

  const props = node?.properties || {};

  if (labels.includes('article')) return true;

  if (props.title || props.publication_year || props.year) return true;

  return false;
}

export function hasFullArticleInfo(node) {
  const props = node?.properties || {};

  const id = props.id ?? node?.id;
  const title = props.title;
  const doi = props.doi;
  const year = props.publication_year ?? props.year;

  return (
    id !== undefined &&
    id !== null &&
    String(id).trim() !== '' &&
    title !== undefined &&
    title !== null &&
    String(title).trim() !== '' &&
    doi !== undefined &&
    doi !== null &&
    String(doi).trim() !== '' &&
    year !== undefined &&
    year !== null &&
    String(year).trim() !== ''
  );
}

export function isDoiConnectorNode(node) {
  const labels = Array.isArray(node?.labels)
    ? node.labels.map((x) => String(x).toLowerCase())
    : [];

  const props = node?.properties || {};

  if (labels.some((x) => x.includes('doi'))) return true;
  if (labels.some((x) => x.includes('reference'))) return true;

  if (props.doi && !props.title && !props.publication_year && !props.year) {
    return true;
  }

  if (props.value && String(props.value).includes('10.')) {
    return true;
  }

  return false;
}

export function makeLinkKey(source, target, type = 'REFERENCES') {
  const a = String(source);
  const b = String(target);

  return a < b ? `${a}-${type}-${b}` : `${b}-${type}-${a}`;
}

export function buildGraphData(apiResponse) {
  const nodesIn = Array.isArray(apiResponse?.nodes) ? apiResponse.nodes : [];
  const relsIn = Array.isArray(apiResponse?.relationships)
    ? apiResponse.relationships
    : [];

  const allNodeMap = new Map();
  const articleMap = new Map();

  for (const n of nodesIn) {
    const properties = n?.properties || {};
    const id = String(n?.id ?? properties?.id);

    if (!id || id === 'undefined' || id === 'null') continue;

    allNodeMap.set(id, n);

    if (!isArticleNode(n)) continue;
    if (!hasFullArticleInfo(n)) continue;

    const label = getDisplayLabel(properties, id);

    articleMap.set(id, {
      id,
      label,
      properties,
      degree: 0,
      year: Number(properties?.publication_year || properties?.year) || null,
      title:
        [
          properties?.title ? `Title: ${properties.title}` : null,
          properties?.doi ? `DOI: ${properties.doi}` : null,
          properties?.publication_year
            ? `Year: ${properties.publication_year}`
            : null,
        ]
          .filter(Boolean)
          .join('\n') || label,
    });
  }

  const linkMap = new Map();
  const doiToArticles = new Map();

  for (const r of relsIn) {
    const source = String(r?.start);
    const target = String(r?.end);

    const sourceIsArticle = articleMap.has(source);
    const targetIsArticle = articleMap.has(target);

    if (sourceIsArticle && targetIsArticle) {
      const key = makeLinkKey(source, target, r?.type || 'REFERENCES');

      if (!linkMap.has(key)) {
        linkMap.set(key, {
          id: String(r?.id ?? key),
          source,
          target,
          type: r?.type || 'REFERENCES',
          properties: r?.properties || {},
        });
      }

      continue;
    }

    if (sourceIsArticle && !targetIsArticle) {
      const connectorNode = allNodeMap.get(target);

      if (connectorNode && isDoiConnectorNode(connectorNode)) {
        if (!doiToArticles.has(target)) {
          doiToArticles.set(target, new Set());
        }

        doiToArticles.get(target).add(source);
      }

      continue;
    }

    if (!sourceIsArticle && targetIsArticle) {
      const connectorNode = allNodeMap.get(source);

      if (connectorNode && isDoiConnectorNode(connectorNode)) {
        if (!doiToArticles.has(source)) {
          doiToArticles.set(source, new Set());
        }

        doiToArticles.get(source).add(target);
      }
    }
  }

  for (const [doiNodeId, articleSet] of doiToArticles.entries()) {
    const articleIds = Array.from(articleSet);

    if (articleIds.length < 2) continue;

    for (let i = 0; i < articleIds.length; i += 1) {
      for (let j = i + 1; j < articleIds.length; j += 1) {
        const source = articleIds[i];
        const target = articleIds[j];

        const key = makeLinkKey(source, target, 'REFERENCES');

        if (!linkMap.has(key)) {
          linkMap.set(key, {
            id: key,
            source,
            target,
            type: 'REFERENCES',
            properties: {
              generated_from: 'DOI_NODE',
              hidden_doi_node_id: doiNodeId,
            },
          });
        }
      }
    }
  }

  for (const link of linkMap.values()) {
    const sourceNode = articleMap.get(String(link.source));
    const targetNode = articleMap.get(String(link.target));

    if (sourceNode) sourceNode.degree += 1;
    if (targetNode) targetNode.degree += 1;
  }

  const nodes = Array.from(articleMap.values()).map((node) => {
      const citationCount =
        Number(
          node.properties?.citation_count ??
            node.properties?.citations ??
            node.properties?.reference_count ??
            0
        ) || 0;

      const sizeMetric = Math.max(node.degree, Math.sqrt(citationCount));

      // Giảm size node lớn bằng log để node không phình quá mức
      const visualSize = 8 + Math.log1p(sizeMetric) * 8;

      return {
        ...node,
        val: clamp(visualSize, 8, 34),
      };
    });

  const visibleNodeIds = new Set(nodes.map((node) => String(node.id)));

  const links = Array.from(linkMap.values()).filter((link) => {
    return (
      visibleNodeIds.has(String(link.source)) &&
      visibleNodeIds.has(String(link.target))
    );
  });

  return {
    nodes,
    links,
  };
}

export function getYearRange(nodes) {
  const years = nodes.map((n) => getYearFromNode(n)).filter(Boolean);

  if (!years.length) {
    return {
      minYear: 2020,
      maxYear: 2025,
    };
  }

  return {
    minYear: Math.min(...years),
    maxYear: Math.max(...years),
  };
}