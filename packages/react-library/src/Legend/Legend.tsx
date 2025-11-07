import React from 'react';
import './Legend.scss';

export interface LegendItem {
  label: string;
  color: string;
}

export interface LegendProps {
  items: LegendItem[];
  legendTitle?: string;
  className?: string;
}

const Legend: React.FC<LegendProps> = ({ items, legendTitle, className }) => {
  return (
    <div className={`legend ${className || ''}`}>
      {legendTitle && <h4 className="legend-title">{legendTitle}</h4>}
      <div className="legend-items">
        {items.map((item, index) => (
          <div key={index} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
