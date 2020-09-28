import * as React from 'react';

interface MeasureTextProps {
  strings: { [k: string]: string };
  className: string;
  children(measurements: { [k: string]: number }): React.ReactNode;
}

export class MeasureText extends React.Component<MeasureTextProps, any> {
  myRef = React.createRef<SVGSVGElement>();

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const children = Array.from(this.myRef.current.children);
    const textElements = children.filter(isSvgTextElement);
    const measurements = textElements.reduce((acc, item) => {
      const textLength = item.getComputedTextLength();
      acc[item.dataset.key] = textLength;
      return acc;
    }, {});
    this.setState({ measurements });
  }

  render() {
    return !this.state.measurements ? (
      <svg ref={this.myRef}>
        {Object.entries(this.props.strings).map(([key, value]) => (
          <text data-key={key} className={this.props.className}>
            {value}
          </text>
        ))}
      </svg>
    ) : (
      <div>{this.props.children(this.state.measurements)}</div>
    );
  }
}

function isSvgTextElement(elem: Element): elem is SVGTextElement {
  return elem.nodeName === 'text';
}
