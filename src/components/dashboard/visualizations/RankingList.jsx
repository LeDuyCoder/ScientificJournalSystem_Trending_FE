import './RankingList.css';

export default function RankingList({ title, items }) {
  // Find the maximum value to calculate the bar width relative to the largest
  const maxValue = Math.max(...items.map(item => item.value));

  return (
    <div className="ranking-list-container dashboard-card">
      <div className="ranking-list-header">
        <h3 className="ranking-list-title">{title}</h3>
      </div>
      
      <div className="ranking-list-content">
        {items.map((item, index) => (
          <div key={index} className="ranking-item">
            <div className="ranking-item-info">
              <span className="ranking-item-name">{item.name}</span>
              <span className="ranking-item-value">{item.displayValue}</span>
            </div>
            <div className="ranking-item-bar-container">
              <div 
                className="ranking-item-bar" 
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
