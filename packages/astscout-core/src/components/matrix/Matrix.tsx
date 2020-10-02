import * as React from 'react';
import { Grid } from './Grid';
import { MatrixModel } from '../../core/view-model/matrix-model';
import { MeasureText } from './MeasureText';
import { adopt } from 'react-adopt';
import { AutoSizer } from 'react-virtualized';
import { rowGridMargin, columnGridMargin } from './constants';

interface MatrixProps extends MatrixModel {
  cellWidth: number;
  cellHeight: number;
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

const viewport = ({ render }) => (
  <div style={{ width: '100%' }}>
    <AutoSizer>{render}</AutoSizer>
  </div>
);

const Composed = adopt({
  offsets,
  viewport,
});

export function Matrix(props: MatrixProps) {
  return (
    <Composed {...props}>
      {({ offsets: { offsetLeft, offsetTop }, viewport: { width } }) => {
        const { rows, columns, links, cellWidth, cellHeight } = props;

        offsetLeft += rowGridMargin;
        offsetTop += columnGridMargin;
        const canvasOuterWidth = columns.length * cellWidth + offsetLeft;
        const canvasOuterHeight = rows.length * cellHeight + offsetTop;
        const ratio = canvasOuterWidth / canvasOuterHeight;

        const viewportWidth =
          canvasOuterWidth < width ? canvasOuterWidth : width;
        const viewportHeight = viewportWidth / ratio;

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
