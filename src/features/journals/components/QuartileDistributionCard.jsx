import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../../shared/components/common/Card';
import InlineErrorState from '../../../shared/components/common/InlineErrorState';

const DonutSegment = ({ percentage, offset, colorClass, isMounted }) => {
  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  const strokeDashoffset = -((offset / 100) * circumference);

  return (
    <circle
      cx="100"
      cy="100"
      r={radius}
      fill="transparent"
      strokeWidth="12"
      className={`qdc-segment ${colorClass}`}
      strokeDasharray={circumference}
      style={{
        strokeDasharray: isMounted ? strokeDasharray : `0 ${circumference}`,
        strokeDashoffset: strokeDashoffset,
        transition: 'stroke-dasharray 1s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    />
  );
};

const QuartileDistributionCard = ({ data, loading, error, onRetry }) => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const formatTotal = (num) => {
    if (!num) return '0';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const getColorToken = (quartile) => {
    switch (quartile) {
      case 'Q1': return 'orange';
      case 'Q2': return 'dark';
      case 'Q3': return 'gray';
      case 'Q4': return 'lightGray';
      default: return 'gray';
    }
  };

  return (
    <Card 
      title={t('journals.quartileDistribution', 'Quartile Distribution')} 
      subtitle={t('journals.portfolioConcentration', 'Portfolio concentration by Scimago Quartile')} 
      className="qdc-card"
    >
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-neutral-500)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 10px' }}></div>
          {t('common.loading', 'Loading quartile data...')}
        </div>
      ) : error ? (
        <InlineErrorState 
          title={t('common.error', 'Network Error')}
          message={error.toLowerCase().includes('not found') || error.toLowerCase().includes('404') ? t('journals.noQuartileData', 'No quartile data available for this project.') : error}
          onRetry={error.toLowerCase().includes('not found') || error.toLowerCase().includes('404') ? null : onRetry}
          minHeight={200}
        />
      ) : !data || !data.distribution || data.totalJournals === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-neutral-500)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          {t('journals.noDataAvailable', 'No journal data available for the selected filters.')}
        </div>
      ) : (
        <div className="qdc-content">
          <div className="qdc-chart-wrapper">
            <div className="qdc-chart-container" aria-label="Quartile Distribution Donut Chart">
              <svg viewBox="0 0 200 200" className="qdc-donut" preserveAspectRatio="xMidYMid meet">
                <circle cx="100" cy="100" r="86" fill="transparent" strokeWidth="12" className="qdc-track" />
                {data.distribution.map((item, index, arr) => {
                  const currentOffset = arr
                    .slice(0, index)
                    .reduce((sum, prevItem) => sum + prevItem.percentage, 0);
                  const quartileCode = item.group.substring(0, 2);

                  return (
                    <DonutSegment 
                      key={item.group}
                      percentage={item.percentage}
                      offset={currentOffset}
                      colorClass={`qdc-color-${getColorToken(quartileCode)}`}
                      isMounted={isMounted}
                    />
                  );
                })}
              </svg>
              <div className="qdc-center">
                <span className="qdc-center-value">{formatTotal(data.totalJournals)}</span>
                <span className="qdc-center-label">{t('journals.totalJournalsUpper', 'TOTAL JOURNALS')}</span>
              </div>
            </div>
          </div>

          <div className="qdc-legend-wrapper">
            <div className="qdc-legend" role="list" aria-label="Quartile distribution legend">
              {data.distribution.map((item) => {
                const quartileCode = item.group.substring(0, 2);
                return (
                  <div className="qdc-legend-item" key={item.group} role="listitem">
                    <div className={`qdc-legend-color qdc-bg-${getColorToken(quartileCode)}`} aria-hidden="true"></div>
                    <div className="qdc-legend-text">
                      <span className="qdc-legend-title">{t(`journals.groups.${item.group}`, item.group)}</span>
                      <span className="qdc-legend-percentage">
                        {t('journals.pctOfPortfolio', { 
                          percentage: item.percentage, 
                          defaultValue: `${item.percentage}% of Portfolio` 
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default QuartileDistributionCard;
