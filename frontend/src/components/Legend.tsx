import React from 'react';

const Legend: React.FC = () => {
  return (
    <div className="legend">
      <div className="legend-item">
        <div
          className="legend-color"
          style={{ backgroundColor: 'var(--highlight-green)' }}
        ></div>
        <span>Is prerequisite for</span>
      </div>
      <div className="legend-item">
        <div
          className="legend-color"
          style={{ backgroundColor: 'var(--highlight-blue)' }}
        ></div>
        <span>Co-requisite</span>
      </div>
      <div className="legend-item">
        <div
          className="legend-color"
          style={{ backgroundColor: 'var(--highlight-red)' }}
        ></div>
        <span>Prerequisite</span>
      </div>
    </div>
  );
};

export default Legend;
