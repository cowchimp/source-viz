import * as React from 'react';
import { SourcePanel } from './SourcePanel';
import { AnalysisMode, CodeMatrix } from 'source-viz-core';
import { examples } from '../examples';
import { Description } from './Description';
import { Title } from './Title';
import { Mode } from './Mode';

interface AppState {
  mode: AnalysisMode;
  initialCode: string;
  draftCode: string;
  code: string;
}

export class App extends React.Component<any, AppState> {
  constructor(props) {
    super(props);

    const defaultMode = AnalysisMode.class;
    this.state = {
      mode: defaultMode,
      initialCode: examples[defaultMode],
      draftCode: examples[defaultMode],
      code: '',
    };
  }

  onModeChange = (value) => {
    this.setState({
      mode: value,
      initialCode: examples[value],
    });
  };

  onCodeChange = (newCode) => {
    this.setState({ draftCode: newCode });
  };

  onAnalyze = () => {
    this.setState({
      code: this.state.draftCode,
    });
  };

  render() {
    return (
      <div>
        <div className="top">
          <Title />
          <Description />
          <Mode value={this.state.mode} onChange={this.onModeChange} />
          <SourcePanel
            code={this.state.draftCode}
            initialCode={this.state.initialCode}
            onCodeChange={this.onCodeChange}
            onAnalyze={this.onAnalyze}
          />
        </div>
        <CodeMatrix code={this.state.code} mode={this.state.mode} />
      </div>
    );
  }
}
