import * as React from 'react';
import {SourcePanel} from './SourcePanel';
import {ConfigurableMatrix} from './ConfigurableMatrix';
import {examples} from '../examples';
import {MemberInfo} from '../core/types';
import {analyzeSource} from '../core/parsers/typescript/class-based/analyzeSource';
import {analyzeModuleSource} from '../core/parsers/typescript/module-based/analyzeModuleSource';
import {Description} from './Description';
import {Title} from './Title';
import {Mode} from './Mode';
import {AnalysisMode} from '../core/view-model/view-config';

interface AppState {
  mode: AnalysisMode;
  initialCode: string;
  code: string;
  members: MemberInfo[]
}

export class App extends React.Component<any, AppState> {
  constructor(props) {
    super(props);

    const defaultMode = AnalysisMode.class;
    this.state = {
      mode: defaultMode,
      initialCode: examples[defaultMode],
      code: examples[defaultMode],
      members: []
    }
  }

  onModeChange = (value) => {
    this.setState({ mode: value, initialCode: examples[value] });
  };

  onCodeChange = (newCode) => {
    this.setState({ code: newCode });
  };

  onAnalyze = async () => {
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
    this.setState({ members })
  };

  render() {
    return (
      <div>
        <div className="top">
          <Title />
          <Description />
          <Mode value={this.state.mode} onChange={this.onModeChange} />
          <SourcePanel code={this.state.code} initialCode={this.state.initialCode} onCodeChange={this.onCodeChange} onAnalyze={this.onAnalyze} />
        </div>
        <ConfigurableMatrix members={this.state.members} />
      </div>
    );
  }
}