import * as React from 'react';
import { AnalysisMode } from 'astscout-core';

interface ModeProps {
  value: AnalysisMode;
  onChange: (string) => void;
}

interface ModeState {
  description: string;
}

const texts = {
  [AnalysisMode.class]: {
    title: 'Class-based',
    description:
      'For <a href="https://www.typescriptlang.org/docs/handbook/classes.html" target="_blank">ES6 Classes</a>. Treats constructor parameters as <strong>dependencies</strong> (<a href="https://docs.angularjs.org/guide/di" target="_blank">Angular 1.x</a> style).',
  },
  [AnalysisMode.module]: {
    title: 'Module-based',
    description:
      'For <a href="https://www.typescriptlang.org/docs/handbook/modules.html" target="_blank">ES6 Modules</a>. Treats imported modules as <strong>dependencies</strong>.<br />Top-level functions are <strong>methods</strong>. Exported functions are <strong>public methods</strong>.',
  },
};

export class Mode extends React.Component<ModeProps, ModeState> {
  constructor(props) {
    super(props);
    this.state = { description: texts[props.value].description };
  }

  onChange = (value: string) => {
    this.props.onChange(value);
    this.setState({ description: texts[value].description });
  };

  render() {
    return (
      <div className="mode">
        <div>
          <strong>Mode: </strong>
          <select
            defaultValue={this.props.value}
            onChange={(e) => this.onChange(e.target.value)}
          >
            <ModeOption mode={AnalysisMode.class} />
            <ModeOption mode={AnalysisMode.module} />
          </select>
        </div>
        <div className="mode-info">
          <div className="info-symbol">&#9432;</div>
          <div
            className="mode-description"
            dangerouslySetInnerHTML={{ __html: this.state.description }}
          />
        </div>
      </div>
    );
  }
}

function ModeOption({ mode }) {
  return <option value={mode}>{texts[mode].title}</option>;
}
