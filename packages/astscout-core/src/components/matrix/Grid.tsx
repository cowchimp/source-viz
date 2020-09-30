import * as React from 'react';
import { HoverHighlightGroup } from './HoverHighlightGroup';
import { Row } from './Row';
import { Column } from './Column';
import { Cell } from './Cell';
import { HoverTargetGroup } from './HoverTargetGroup';
import { MatrixModel } from '../../core/view-model/matrix-model';

interface GridProps extends MatrixModel {
  cellWidth: number;
  cellHeight: number;
}

export class Grid extends React.Component<GridProps, any> {
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

  render() {
    const { cellWidth, cellHeight, rows, columns, links } = this.props;
    const width = columns.length * cellWidth;
    const height = rows.length * cellHeight;

    const xScale = (label) =>
      columns.findIndex((x) => x.label == label) * cellWidth;
    const yScale = (label) => rows.findIndex((x) => x == label) * cellHeight;

    return (
      <g onMouseLeave={this.onMatrixMouseLeave}>
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
    );
  }
}
