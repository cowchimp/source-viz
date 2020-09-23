import * as React from 'react';
import { Grid } from './Grid';

export class Matrix extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getMargin(labels: string[]) {
    const longestCharCount = labels.reduce(
      (max, label) => (label.length > max.length ? label : max),
      '',
    ).length;
    return longestCharCount * 10 + 20;
  }

  render() {
    const {
      rows,
      columns,
      links,
      cellWidth,
      cellHeight,
      zoomRatio = 1,
    } = this.props;

    const margin = {
      top: this.getMargin(rows) + 40,
      left: this.getMargin(columns.map((x) => x.label)),
      right: 0,
      bottom: 10,
    };
    const width = columns.length * cellWidth;
    const height = rows.length * cellHeight;
    const outerWidth = width + margin.left + margin.right;
    const outerHeight = height + margin.top + margin.bottom;

    return (
      <svg
        width={outerWidth * zoomRatio}
        height={outerHeight * zoomRatio}
        viewBox={`0 0 ${outerWidth} ${outerHeight}`}
      >
        <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
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
  }
}
