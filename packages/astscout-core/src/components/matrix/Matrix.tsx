import * as React from 'react';
import { Grid } from './Grid';
import { MatrixModel } from '../../core/view-model/matrix-model';

interface MatrixProps extends MatrixModel {
  cellWidth: number;
  cellHeight: number;
  zoomRatio: number;
}

export class Matrix extends React.Component<MatrixProps, any> {
  myRef = React.createRef<SVGSVGElement>();

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const topElement = (document.getElementById(
      'astscout-top',
    ) as unknown) as SVGTextContentElement;
    const leftElement = (document.getElementById(
      'astscout-left',
    ) as unknown) as SVGTextContentElement;

    this.setState({
      offset: {
        top: Math.ceil(topElement.getComputedTextLength()) + 6,
        left: Math.ceil(leftElement.getComputedTextLength()) + 6,
      },
    });
  }

  render() {
    const { rows, columns } = this.props;

    return !this.state.offset ? (
      <svg ref={this.myRef}>
        <text id="astscout-top" className="code">
          {getLongestString(columns.map((x) => x.label))}
        </text>
        <text id="astscout-left" className="code">
          {getLongestString(rows)}
        </text>
      </svg>
    ) : (
      <Matrix2
        {...this.props}
        offsetLeft={this.state.offset.left}
        offsetTop={this.state.offset.top}
      />
    );
  }
}

function getLongestString(labels: string[]): string {
  return labels.reduce(
    (max, label) => (label.length > max.length ? label : max),
    '',
  );
}

interface Matrix2Props extends MatrixProps {
  offsetLeft: number;
  offsetTop: number;
}

function Matrix2(props: Matrix2Props) {
  const {
    rows,
    columns,
    links,
    cellWidth,
    cellHeight,
    zoomRatio = 1,
    offsetLeft,
    offsetTop,
  } = props;

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
}
