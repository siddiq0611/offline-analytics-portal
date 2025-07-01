import React from 'react';

export function BarChart({ data, title }) {
  if (!data || !data.labels || !data.datasets) {
    return <div>No chart data available</div>;
  }

  const maxValue = Math.max(
    ...data.datasets.flatMap(dataset => dataset.data)
  );

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc' }}>
      <h3>{title}</h3>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '150px' }}>
        {data.labels.map((label, index) => (
          <div key={index} style={{ textAlign: 'center', width: '40px' }}>
            {data.datasets.map((dataset, i) => (
              <div
                key={i}
                style={{
                  height: `${(dataset.data[index] / maxValue) * 100}px`,
                  background: dataset.backgroundColor,
                  margin: '2px 0',
                }}
              ></div>
            ))}
            <div style={{ fontSize: '10px' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '10px' }}>
        {data.datasets.map((dataset, i) => (
          <div key={i} style={{ fontSize: '12px' }}>
            <span style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              background: dataset.backgroundColor,
              marginRight: '5px'
            }}></span>
            {dataset.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;