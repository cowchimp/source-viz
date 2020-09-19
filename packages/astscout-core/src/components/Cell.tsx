import * as React from 'react';

export function Cell({ x, y, cellWidth, cellHeight }) {
  return (
    <rect className="cell" x={x} y={y} width={cellWidth} height={cellHeight} />
  );
}
