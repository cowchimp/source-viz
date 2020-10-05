import * as React from 'react';
import { SourcePanel } from './SourcePanel';
import {
  AnalysisMode,
  analyzeSource,
  analyzeModuleSource,
  ConfigurableMatrix,
} from 'astscout-core';
import type { MemberInfo } from 'astscout-core';
import { examples } from '../examples';
import { Description } from './Description';
import { Title } from './Title';
import { Mode } from './Mode';

interface AppState {
  mode: AnalysisMode;
  initialCode: string;
  code: string;
  members: MemberInfo[];
}

export class App extends React.Component<any, AppState> {
  constructor(props) {
    super(props);

    const defaultMode = AnalysisMode.class;
    this.state = {
      mode: defaultMode,
      initialCode: examples[defaultMode],
      code: examples[defaultMode],
      members: [],
    };
  }

  onModeChange = (value) => {
    this.setState({
      mode: value,
      initialCode: examples[value],
    });
  };

  onCodeChange = (newCode) => {
    this.setState({ code: newCode });
  };

  onAnalyze = () => {
    let members;
    switch (this.state.mode) {
      case 'class':
        members = analyzeSource(this.state.code);
        break;
      case 'module':
        members = analyzeModuleSource(this.state.code);
        break;
      default:
        members = [];
    }
    this.setState({ members });
  };

  render() {
    return (
      <div>
        <div className="top">
          <Title />
          <Description />
          <Mode value={this.state.mode} onChange={this.onModeChange} />
          <SourcePanel
            code={this.state.code}
            initialCode={this.state.initialCode}
            onCodeChange={this.onCodeChange}
            onAnalyze={this.onAnalyze}
          />
        </div>
        <ConfigurableMatrix members={this.state.members} />
      </div>
    );
  }
}
