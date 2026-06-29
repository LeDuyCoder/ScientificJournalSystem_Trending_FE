import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './CollaborationAnalytics.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ background: 'white', padding: '10px', border: '1px solid #E5E7EB', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Entity: {data.type}</p>
        <p style={{ margin: 0 }}>Impact: {data.y}</p>
        <p style={{ margin: 0 }}>Productivity: {data.x}</p>
      </div>
    );
  }
  return null;
};

const AuthorImpactMatrix = ({ data }) => {
  if (!data) return null;

  return (
    <div className="ca-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 className="ca-card-title" style={{ margin: 0 }}>Productivity vs. Impact Matrix</h3>
      </div>
      <div style={{ width: '100%', height: 300, minWidth: 0 }}>
        <ResponsiveContainer width="99%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="x" type="number" name="Productivity" domain={['dataMin - 10', 'dataMax + 10']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} label={{ value: 'ARTICLE OUTPUT (YEARLY)', position: 'insideBottom', offset: -10, fill: '#6B7280', fontSize: 10, fontWeight: 600 }} />
            <YAxis dataKey="y" type="number" name="Impact" domain={['dataMin - 10', 'dataMax + 10']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} label={{ value: 'IMPACT FACTOR H-INDEX', angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 10, fontWeight: 600 }} />
            <ZAxis dataKey="size" range={[50, 400]} name="Size" />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={data} fill="#EA580C">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.type === 'active' ? '#EA580C' : '#9CA3AF'} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AuthorImpactMatrix;
