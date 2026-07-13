import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Sankey, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../../../shared/components/common/Card';
import InlineErrorState from '../../../shared/components/common/InlineErrorState';

const PeriodBadge = () => (
  <div className="mac-badge">
    2024–2026
  </div>
);

const NODE_NAMES = {
  SUBSCRIPTION: "SUBSCRIPTION",
  HYBRID: "HYBRID",
  FULL_OPEN_ACCESS: "FULL OPEN ACCESS",
  LEGACY_MODEL: "LEGACY MODEL"
};

const MigrationAnalysisCard = ({ data, isLoading, error, onRetry }) => {
  const { t } = useTranslation();
  const isDataEmpty = !data || (data.totalCount === 0 && !data.flows?.length);

  const sankeyData = useMemo(() => {
    if (isDataEmpty) return { nodes: [], links: [] };
    
    // Filter flows with value > 0
    const activeFlows = (data.flows || []).filter(flow => flow.value > 0);
    
    // Find all unique source and target names
    const activeNodeNames = new Set();
    activeFlows.forEach(flow => {
      activeNodeNames.add(flow.source);
      activeNodeNames.add(flow.target);
    });

    const ALL_NODES = [
      { id: 'SUBSCRIPTION', name: NODE_NAMES.SUBSCRIPTION, fill: 'var(--color-neutral-800)', textColor: '#fff' },
      { id: 'HYBRID', name: NODE_NAMES.HYBRID, fill: 'var(--color-neutral-500)', textColor: '#fff' },
      { id: 'FULL_OPEN_ACCESS', name: NODE_NAMES.FULL_OPEN_ACCESS, fill: 'var(--color-primary-orange)', textColor: '#fff' },
      { id: 'LEGACY_MODEL', name: NODE_NAMES.LEGACY_MODEL, fill: 'var(--color-neutral-200)', textColor: 'var(--color-neutral-800)' }
    ];

    const nodes = ALL_NODES.filter(node => activeNodeNames.has(node.id));

    const nodeIndexMap = {};
    nodes.forEach((node, index) => {
      nodeIndexMap[node.id] = index;
    });

    const links = activeFlows.map(flow => ({
      source: nodeIndexMap[flow.source],
      target: nodeIndexMap[flow.target],
      value: flow.value
    }));

    return { nodes, links };
  }, [data, isDataEmpty]);

  const CustomNode = ({ x, y, width, height, payload }) => {
    // Đảm bảo khối màu không bao giờ bị quá lùn (tối thiểu 24px để nhét vừa chữ)
    const rectHeight = Math.max(height, 24);
    // Nếu khối bị đẩy cao lên, ta cũng điều chỉnh y một chút để nó vẫn nằm giữa luồng chảy
    const rectY = height < 24 ? y - (24 - height) / 2 : y;
    const nodeName = t(`journals.nodes.${payload.id}`, payload.name);

    return (
      <g>
        <rect x={x} y={rectY} width={width} height={rectHeight} fill={payload.fill} rx="2" />
        <foreignObject x={x} y={rectY - 20} width={width} height={rectHeight + 40}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 4px', textAlign: 'center' }}>
             <span style={{ color: payload.textColor, fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.05em', lineHeight: 1.2 }}>
               {nodeName}
             </span>
          </div>
        </foreignObject>
      </g>
    );
  };

  const CustomLink = (props) => {
    const { sourceX, targetX, sourceY, targetY, sourceControlX, targetControlX, linkWidth, target } = props;
    const isTargetFOA = target?.name === NODE_NAMES.FULL_OPEN_ACCESS;
    const stroke = isTargetFOA ? 'var(--color-primary-orange)' : 'var(--color-neutral-400)';
    
    return (
      <path
        d={`
          M${sourceX},${sourceY}
          C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
        `}
        stroke={stroke}
        strokeWidth={Math.max(linkWidth, 1)}
        fill="none"
        strokeOpacity={isTargetFOA ? 0.3 : 0.25}
        className="mac-link-anim"
      />
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div style={{ background: '#fff', border: '1px solid var(--color-neutral-200)', padding: '10px', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-neutral-600)' }}>
            {t('journals.journals', 'Journals')}: <strong style={{ color: 'var(--color-neutral-900)' }}>{data.value}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-neutral-500)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', minHeight: '350px' }}>
          <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 10px' }}></div>
          {t('common.loading', 'Loading migration analysis...')}
        </div>
      );
    }

    if (error) {
      const isNotFoundError = error.toLowerCase().includes('not found') || error.toLowerCase().includes('404');
      if (isNotFoundError) {
        return (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-neutral-500)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', minHeight: '350px' }}>
            {t('journals.noMigrationDataNotFound', 'No migration data available for this project (Project ID not found).')}
          </div>
        );
      }
      return (
        <InlineErrorState 
          title={t('common.error', 'Network Error')}
          message={error}
          onRetry={onRetry || (() => window.location.reload())}
          minHeight={350}
        />
      );
    }

    if (isDataEmpty || sankeyData.links.length === 0) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-neutral-500)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', minHeight: '350px' }}>
          {t('journals.noMigrationData', 'No migration data available for this project.')}
        </div>
      );
    }

    return (
      <div className="mac-content">
        <div className="mac-chart-container" aria-label="Migration Analysis Flow Chart">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={sankeyData}
              node={<CustomNode />}
              link={<CustomLink />}
              nodePadding={50}
              margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
              nodeWidth={110}
            >
              <Tooltip content={<CustomTooltip />} />
            </Sankey>
          </ResponsiveContainer>
        </div>
        <div className="mac-footer">
          <span className="mac-footer-metric">{t('journals.total', 'TOTAL')}: {data.totalCount}</span>
          <span className="mac-footer-metric">{t('journals.transitionRate', 'TRANSITION RATE')}: +{data.transitionRate}%</span>
        </div>
      </div>
    );
  };

  return (
    <Card 
      title={t('journals.migrationAnalysis', 'Migration Analysis')} 
      subtitle={t('journals.subscriptionTransition', 'Subscription to Open Access Transition')} 
      actions={<PeriodBadge />}
      className="mac-card flex flex-col h-full"
    >
      {renderContent()}
    </Card>
  );
};


export default MigrationAnalysisCard;
