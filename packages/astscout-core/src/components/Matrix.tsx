import * as React from 'react';
import { Row } from './Row';
import { Column } from './Column';
import { Cell } from './Cell';
import { HoverHighlightGroup } from './HoverHighlightGroup';
import { HoverTargetGroup } from './HoverTargetGroup';

export class Matrix extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onCellMouseEnter = (x, y) => {
    this.setState({ highlightX: x, highlightY: y });
  };

  onMatrixMouseLeave = () =>
    this.setState({
      highlightX: null,
      highlightY: null,
    });

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

    const xScale = (label) =>
      columns.findIndex((x) => x.label == label) * cellWidth;
    const yScale = (label) => rows.findIndex((x) => x == label) * cellHeight;

    return (
      <svg
        width={outerWidth * zoomRatio}
        height={outerHeight * zoomRatio}
        viewBox={`0 0 ${outerWidth} ${outerHeight}`}
      >
        <g
          transform={'translate(' + margin.left + ',' + margin.top + ')'}
          onMouseLeave={this.onMatrixMouseLeave}
        >
          <rect fill="#eee" width={width} height={height} />
          <HoverHighlightGroup
            x={this.state.highlightX}
            y={this.state.highlightY}
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            width={width}
            height={height}
          />
          {rows.map((x) => (
            <Row
              key={x}
              label={x}
              y={yScale(x)}
              width={width}
              cellHeight={cellHeight}
            />
          ))}
          {columns.map((x) => (
            <Column
              key={x.label}
              label={x.label}
              type={x.type}
              x={xScale(x.label)}
              height={height}
              cellWidth={cellWidth}
            />
          ))}
          {links.map(({ row, column }) => (
            <Cell
              key={`${row}-${column.label}`}
              x={xScale(column.label)}
              y={yScale(row)}
              cellWidth={cellWidth}
              cellHeight={cellHeight}
            />
          ))}
          <HoverTargetGroup
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            width={width}
            height={height}
            onMouseEnter={this.onCellMouseEnter}
          />
        </g>
      </svg>
    );
  }
}
