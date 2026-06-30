import React from 'react';

export default function ImpactQuartilesCard({ title, description, percentage, label }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="donut-chart-container dashboard-card">
      <div className="donut-chart-info">
        <h3 className="donut-chart-title">{title}</h3>
        <p className="donut-chart-description">{description}</p>
      </div>
      
      <div className="donut-chart-visual">
        <svg className="donut-svg" viewBox="0 0 100 100">
          <circle
            className="donut-bg"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            strokeWidth="8"
          />
          <circle
            className="donut-progress"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="donut-chart-label">
          <span className="donut-percentage">{percentage}%</span>
          <span className="donut-text">{label}</span>
        </div>
      </div>
    </div>
  );
}
