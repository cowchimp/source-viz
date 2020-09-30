import * as React from 'react';
import { rowGridMargin } from './constants';

export function Row({ label, y, width, cellHeight }) {
  return (
    <g className="row" transform={'translate(0,' + y + ')'}>
      <line stroke="#fff" x2={width} />
      <text
        x={-rowGridMargin}
        y={cellHeight / 2}
        dy=".32em"
        textAnchor="end"
        className="code"
      >
        {label}
      </text>
    </g>
  );
}
