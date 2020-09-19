import * as React from 'react';

export function Zoom({ activeZoom, onZoomChange }) {
  return (
    <div className="control">
      Zoom:
      <div>
        <input
          type="range"
          min=".5"
          max="1.5"
          step="0.25"
          value={activeZoom}
          onChange={(e) => onZoomChange(e.target.value)}
        />
      </div>
    </div>
  );
}
