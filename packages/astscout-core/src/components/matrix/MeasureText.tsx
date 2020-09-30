import * as React from 'react';
import * as isEqual from 'lodash.isequal';

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
    const currentRef = this.myRef.current;
    if (currentRef) {
      this.measure(currentRef);
    }
  }

  componentDidUpdate(prevProps: Readonly<MeasureTextProps>) {
    if (
      !isEqual(
        Object.values(prevProps.strings),
        Object.values(this.props.strings),
      )
    ) {
      this.setState({ measurements: null });
      return;
    }

    const currentRef = this.myRef.current;
    if (currentRef) {
      this.measure(currentRef);
    }
  }

  private measure(currentRef: SVGSVGElement) {
    const children = Array.from(currentRef.children);
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
          <text key={key} data-key={key} className={this.props.className}>
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
