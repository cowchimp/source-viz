import * as React from 'react';
import { Grid } from './Grid';
import { MatrixModel } from '../../core/view-model/matrix-model';
import { MeasureText } from './MeasureText';

interface MatrixProps extends MatrixModel {
  cellWidth: number;
  cellHeight: number;
  zoomRatio: number;
}

export function Matrix(props: MatrixProps) {
  return (
    <MeasureText
      strings={{
        offsetLeft: getLongestString(props.rows),
        offsetTop: getLongestString(props.columns.map((x) => x.label)),
      }}
      className="code"
    >
      {({ offsetLeft, offsetTop }) => {
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
        const width = columns.length * cellWidth;
        const height = rows.length * cellHeight;
        const outerWidth = width + offsetLeft;
        const outerHeight = height + offsetTop;

        return (
          <svg
            width={outerWidth * zoomRatio}
            height={outerHeight * zoomRatio}
            viewBox={`0 0 ${outerWidth} ${outerHeight}`}
          >
            <g transform={'translate(' + offsetLeft + ',' + offsetTop + ')'}>
              <Grid
                width={width}
                height={height}
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
    </MeasureText>
  );
}

function getLongestString(labels: string[]): string {
  return labels.reduce(
    (max, label) => (label.length > max.length ? label : max),
    '',
  );
}
