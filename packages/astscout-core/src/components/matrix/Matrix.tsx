import * as React from 'react';
import { Grid } from './Grid';
import { MatrixModel } from '../../core/view-model/matrix-model';
import { MeasureText } from './MeasureText';
import { adopt } from 'react-adopt';
import { ZoomWrapper } from './ZoomWrapper';
import { rowGridMargin, columnGridMargin } from './constants';

interface MatrixProps extends MatrixModel {
  cellWidth: number;
  cellHeight: number;
  zoomRatio: number;
}

const offsets = ({ rows, columns, render }) => {
  const longestRow = getLongestString(rows);
  const longestColumn = getLongestString(columns.map((x) => x.label));
  return (
    <MeasureText
      strings={{
        offsetLeft: longestRow,
        offsetTop: longestColumn,
      }}
      className="code"
      key={`${longestRow}-${longestColumn}`}
    >
      {render}
    </MeasureText>
  );
};

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

        offsetLeft += rowGridMargin;
        offsetTop += columnGridMargin;
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
