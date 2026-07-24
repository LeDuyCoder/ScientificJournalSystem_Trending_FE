import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Card from '../../../shared/components/common/Card';
import InlineErrorState from '../../../shared/components/common/InlineErrorState';

const CustomBubble = (props) => {
  const { cx, cy, payload } = props;
  const radius = payload.size;
  
  if (payload.quartile === 'Q1' && radius === 18) {
    return (
      <g>
        <circle 
          cx={cx} cy={cy} r={radius} 
          fill="#ffffff" 
          stroke="var(--color-primary-orange)" 
          strokeWidth="2" 
          fillOpacity={0.6}
        />
        <circle 
          cx={cx} cy={cy} r={radius * 0.4} 
          fill="var(--color-primary-orange)" 
          fillOpacity={0.8}
        />
      </g>
    );
  }

  let colorClass = 'imc-bubble-q3';
  if (payload.quartile === 'Q1') colorClass = 'imc-bubble-q1';
  if (payload.quartile === 'Q2') colorClass = 'imc-bubble-q2';

  return (
    <circle
      cx={cx}
      cy={cy}
      r={radius}
      className={colorClass}
      fillOpacity={0.65}
      stroke="#ffffff"
      strokeWidth={1}
    />
  );
};

const getQuartileColor = (quartile) => {
  switch (quartile) {
    case 'Q1': return 'var(--color-q1)';
    case 'Q2': return 'var(--color-q2)';
    default: return 'var(--color-q3)';
  }
};

const CustomTooltip = ({ active, payload }) => {
  const { t } = useTranslation();
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="imc-tooltip">
        <p className="imc-tooltip-title">{data.journalName}</p>
        <div className="imc-tooltip-content">
          <p className="imc-tooltip-item">
            <span className="imc-tooltip-label">{t('journals.sjrScore', 'SJR Score')}:</span>
            <span className="imc-tooltip-value">{data.sjrCitationScore}</span>
          </p>
          <p className="imc-tooltip-item">
            <span className="imc-tooltip-label">{t('journals.hIndex', 'H-Index')}:</span>
            <span className="imc-tooltip-value">{data.hIndex}</span>
          </p>
          <p className="imc-tooltip-item">
            <span className="imc-tooltip-label">{t('journals.articles', 'Articles')}:</span>
            <span className="imc-tooltip-value">{data.size}</span>
          </p>
          <p className="imc-tooltip-item">
            <span className="imc-tooltip-label">{t('journals.quartile', 'Quartile')}:</span>
            <span className="imc-tooltip-value" style={{ color: getQuartileColor(data.quartile) }}>
              {data.quartile}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const LegendActions = ({ data }) => {
  const availableQuartiles = React.useMemo(() => {
    if (!data || !data.length) return ['Q1', 'Q2', 'Q3'];
    const quartiles = new Set(data.map(item => item.quartile));
    return Array.from(quartiles).sort();
  }, [data]);

  return (
    <div className="imc-legend">
      {availableQuartiles.includes('Q1') && (
        <div className="imc-legend-item">
          <div className="imc-legend-color imc-bg-q1"></div>
          <span>Q1</span>
        </div>
      )}
      {availableQuartiles.includes('Q2') && (
        <div className="imc-legend-item">
          <div className="imc-legend-color imc-bg-q2"></div>
          <span>Q2</span>
        </div>
      )}
      {availableQuartiles.includes('Q3') && (
        <div className="imc-legend-item">
          <div className="imc-legend-color imc-bg-q3"></div>
          <span>Q3</span>
        </div>
      )}
    </div>
  );
};

const ImpactMatrixCard = ({ data, loading, error, onRetry }) => {
  const { t } = useTranslation();
  return (
    <Card 
      title={t('journals.impactMatrix', 'Impact Matrix')} 
      subtitle={t('journals.sjrVsHindex', 'SJR vs H-Index Distribution')} 
      actions={<LegendActions data={data} />}
      className="imc-card"
    >
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-neutral-500)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 10px' }}></div>
          {t('common.loading', 'Loading impact matrix data...')}
        </div>
      ) : error ? (
        <InlineErrorState 
          title={t('common.error', 'Network Error')}
          message={error.toLowerCase().includes('not found') || error.toLowerCase().includes('404') ? t('journals.noImpactMatrixData', 'No impact matrix data available for this project.') : error}
          onRetry={error.toLowerCase().includes('not found') || error.toLowerCase().includes('404') ? null : onRetry}
          minHeight={200}
        />
      ) : !data || data.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-neutral-500)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          {t('journals.noDataAvailable', 'No journal data available for the selected filters.')}
        </div>
      ) : (
        <div className="imc-content">
          <div className="imc-chart-container" aria-label="SJR vs H-Index scatter chart">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 45, left: 45 }}>
                <CartesianGrid stroke="#f0f0f0" strokeWidth={1} horizontal={true} vertical={true} />
                <XAxis 
                  type="number" 
                  dataKey="sjrCitationScore" 
                  name={t('journals.sjrCitationScore', 'SJR Citation Score')}
                  domain={['auto', 'auto']}
                  tickCount={8}
                  padding={{ left: 20, right: 20 }}
                  tick={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  label={{ 
                    value: t('journals.sjrCitationScoreUpper', 'SJR CITATION SCORE'), 
                    position: 'bottom', 
                    offset: 15, 
                    fontSize: 10, 
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    fill: 'var(--color-neutral-500)' 
                  }}
                />
                <YAxis 
                  type="number" 
                  dataKey="hIndex" 
                  name={t('journals.hIndex', 'H-Index')}
                  domain={['auto', 'auto']}
                  tickCount={8}
                  padding={{ top: 20, bottom: 20 }}
                  tick={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  label={{ 
                    value: t('journals.hIndexUpper', 'H-INDEX'), 
                    angle: -90, 
                    position: 'left', 
                    offset: 15,
                    fontSize: 10, 
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    fill: 'var(--color-neutral-500)' 
                  }}
                />
                <ZAxis type="number" dataKey="size" range={[60, 400]} name="Size" />
                <Tooltip 
                  content={<CustomTooltip />} 
                  wrapperStyle={{ zIndex: 100, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  cursor={{ strokeDasharray: '3 3', stroke: 'var(--color-neutral-300)' }}
                  shared={false}
                />
                <Scatter data={data} shape={<CustomBubble />} isAnimationActive={true} animationDuration={800} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ImpactMatrixCard;
