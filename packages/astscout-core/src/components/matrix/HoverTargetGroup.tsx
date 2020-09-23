import * as React from 'react';
import * as flatten from 'lodash.flatten';
import * as range from 'lodash.range';

export function HoverTargetGroup({
  cellWidth,
  cellHeight,
  width,
  height,
  onMouseEnter,
}) {
  const coordinates = flatten(
    range(0, width, cellHeight).map((x) =>
      range(0, height, cellWidth).map((y) => ({
        x,
        y,
      })),
    ),
  );

  return (
    <g>
      {coordinates.map(({ x, y }) =>
        HoverTarget({
          x,
          y,
          cellWidth,
          cellHeight,
          onMouseEnter,
        }),
      )}
    </g>
  );
}

function HoverTarget({ x, y, cellWidth, cellHeight, onMouseEnter }) {
  return (
    <rect
      className="hover-target"
      key={`${x}-${y}`}
      x={x}
      y={y}
      width={cellWidth}
      height={cellHeight}
      onMouseEnter={() => onMouseEnter(x, y)}
    />
  );
}
