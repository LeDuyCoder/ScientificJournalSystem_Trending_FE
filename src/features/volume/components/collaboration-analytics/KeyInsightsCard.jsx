import React from 'react';
import { useTranslation } from 'react-i18next';
import './CollaborationAnalytics.css';

const KeyInsightsCard = ({ data }) => {
  const { t } = useTranslation();

  if (!data) {
    return (
      <div className="ca-card ca-card-dark">
        <div className="ca-card-header">
          <h3 className="ca-card-title">{t('volume.keyInsights', 'Key Insights')}</h3>
        </div>
        <p className="ca-insights-desc">{t('volume.noInsights', 'No insights available.')}</p>
      </div>
    );
  }

  return (
    <div className="ca-card ca-card-dark">
      <div className="ca-card-header">
        <h3 className="ca-card-title">{t('volume.keyInsights', 'Key Insights')}</h3>
      </div>
      <p className="ca-insights-desc">{data.subtitle || data.description}</p>
      
      <div>
        {data.metrics && data.metrics.length > 0 ? (
          data.metrics.map((metric, idx) => (
            <div key={idx} className="ca-insight-metric">
              {/* index 0, 2 màu cam (value), index 1 màu trắng (value-white) */}
              <div className={idx % 2 === 0 ? "ca-insight-value" : "ca-insight-value-white"}>
                {metric.value}
              </div>
              <div className="ca-insight-label">{metric.label}</div>
            </div>
          ))
        ) : (
          <div className="ca-insight-metric">
            <div className="ca-insight-value">N/A</div>
            <div className="ca-insight-label">{t('volume.noMetrics', 'No metrics available')}</div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.2 }}>
          <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="6"/>
          <circle cx="85" cy="30" r="10" stroke="white" strokeWidth="6"/>
          <circle cx="20" cy="20" r="10" stroke="white" strokeWidth="6"/>
          <circle cx="20" cy="80" r="10" stroke="white" strokeWidth="6"/>
          <circle cx="85" cy="80" r="10" stroke="white" strokeWidth="6"/>
          <path d="M40 40 L28 28" stroke="white" strokeWidth="6" strokeLinecap="round"/>
          <path d="M60 40 L77 34" stroke="white" strokeWidth="6" strokeLinecap="round"/>
          <path d="M40 60 L28 72" stroke="white" strokeWidth="6" strokeLinecap="round"/>
          <path d="M60 60 L77 72" stroke="white" strokeWidth="6" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
};

export default KeyInsightsCard;
