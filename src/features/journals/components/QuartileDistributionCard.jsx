import React, { useState, useEffect } from 'react';
import Card from '../../../shared/components/common/Card';

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

const QuartileDistributionCard = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!data) return null;

  return (
    <Card 
      title="Quartile Distribution" 
      subtitle="Portfolio concentration by Scimago Quartile" 
      className="qdc-card"
    >
      <div className="qdc-content">
        <div className="qdc-chart-wrapper">
          <div className="qdc-chart-container" aria-label="Quartile Distribution Donut Chart">
            <svg viewBox="0 0 200 200" className="qdc-donut" preserveAspectRatio="xMidYMid meet">
              <circle cx="100" cy="100" r="86" fill="transparent" strokeWidth="12" className="qdc-track" />
              {data.items.map((item, index, arr) => {
                const currentOffset = arr
                  .slice(0, index)
                  .reduce((sum, prevItem) => sum + prevItem.percentage, 0);

                return (
                  <DonutSegment 
                    key={item.quartile}
                    percentage={item.percentage}
                    offset={currentOffset}
                    colorClass={`qdc-color-${item.colorToken}`}
                    isMounted={isMounted}
                  />
                );
              })}
            </svg>
            <div className="qdc-center">
              <span className="qdc-center-value">2.4k</span>
              <span className="qdc-center-label">TOTAL JOURNALS</span>
            </div>
          </div>
        </div>

        <div className="qdc-legend-wrapper">
          <div className="qdc-legend" role="list" aria-label="Quartile distribution legend">
            {data.items.map((item) => (
              <div className="qdc-legend-item" key={item.quartile} role="listitem">
                <div className={`qdc-legend-color qdc-bg-${item.colorToken}`} aria-hidden="true"></div>
                <div className="qdc-legend-text">
                  <span className="qdc-legend-title">{item.quartile} ({item.label})</span>
                  <span className="qdc-legend-percentage">{item.percentage}% of Portfolio</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuartileDistributionCard;
