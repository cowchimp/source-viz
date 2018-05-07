import * as React from 'react';

export function HoverHighlightGroup({x, y, cellWidth, cellHeight, width, height}) {
  if(typeof x != 'number' || typeof y != 'number') {
    return null;
  }

  return (
    <g>
      <rect key="fooX" className="hover-highlight" x={x} y={0} width={cellWidth} height={height} />,
      <rect key="fooY" className="hover-highlight" y={y} x={0} height={cellHeight} width={width} />
    </g>
  );
}
