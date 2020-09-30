import * as React from 'react';
import { Grid } from './Grid';
import { MatrixModel } from '../../core/view-model/matrix-model';
import { MeasureText } from './MeasureText';
import { adopt } from 'react-adopt';
import { ZoomWrapper } from './ZoomWrapper';

interface MatrixProps extends MatrixModel {
  cellWidth: number;
  cellHeight: number;
  zoomRatio: number;
}

const offsets = ({ rows, columns, render }) => (
  <MeasureText
    strings={{
      offsetLeft: getLongestString(rows),
      offsetTop: getLongestString(columns.map((x) => x.label)),
    }}
    className="code"
  >
    {render}
  </MeasureText>
);

const Composed = adopt({
  offsets,
  zoomedOut: <ZoomWrapper />,
});

export function Matrix(props: MatrixProps) {
  return (
    <Composed {...props}>
      {({ offsets: { offsetLeft, offsetTop }, zoomedOut }) => {
        const {
          rows,
          columns,
          links,
          cellWidth,
          cellHeight,
          zoomRatio = 1,
        } = props;

        offsetLeft += 6;
        offsetTop += 6;
        const canvasOuterWidth = columns.length * cellWidth + offsetLeft;
        const canvasOuterHeight = rows.length * cellHeight + offsetTop;
        const viewportWidth = zoomedOut ? '100%' : canvasOuterWidth * zoomRatio;
        const viewportHeight = zoomedOut ? null : canvasOuterHeight * zoomRatio;

        return (
          <svg
            width={viewportWidth}
            height={viewportHeight}
            viewBox={`0 0 ${canvasOuterWidth} ${canvasOuterHeight}`}
          >
            <g transform={'translate(' + offsetLeft + ',' + offsetTop + ')'}>
              <Grid
                cellWidth={cellWidth}
                cellHeight={cellHeight}
                rows={rows}
                columns={columns}
                links={links}
              />
            </g>
          </svg>
        );
      }}
    </Composed>
  );
}

function getLongestString(labels: string[]): string {
  return labels.reduce(
    (max, label) => (label.length > max.length ? label : max),
    '',
  );
}
