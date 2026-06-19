import { useEffect, useMemo, useState } from 'react';

import ArticleGraphWidget from '../components/ArticleGraphWidget';
import { useArticleGraph } from '../hooks/useArticleGraph';
import { clamp, getArticleGraphUrlParams } from '../utils/articleGraph.utils';

export default function ArticleGraphEmbedPage() {
  const initialParams = useMemo(() => getArticleGraphUrlParams(), []);

  const [params, setParams] = useState(initialParams);

  const { data, loading, error } = useArticleGraph({
    keyword: params.keyword,
    limit: params.limit,
  });

  useEffect(() => {
    const handleMessage = (event) => {
      const allowedOrigins = String(
        import.meta.env.VITE_EMBED_ALLOWED_ORIGINS || ''
      )
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean);

      if (allowedOrigins.length > 0 && !allowedOrigins.includes(event.origin)) {
        return;
      }

      const message = event.data;

      if (!message || message.source !== 'article-graph-parent') {
        return;
      }

      if (message.type === 'ARTICLE_GRAPH_LOAD') {
        const nextKeyword =
          message.payload?.keyword ||
          message.payload?.q ||
          params.keyword ||
          'graph';

        const nextLimitRaw = Number(message.payload?.limit);
        const nextLimit = Number.isFinite(nextLimitRaw)
          ? clamp(nextLimitRaw, 1, 500)
          : 50;

        setParams({
          keyword: String(nextKeyword).trim(),
          limit: nextLimit,
        });
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [params.keyword]);

  return (
    <ArticleGraphWidget
      data={data}
      loading={loading}
      error={error}
      keyword={params.keyword}
      limit={params.limit}
    />
  );
}