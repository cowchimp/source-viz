import * as React from 'react';
import {SourcePanel} from './SourcePanel';
import {ConfigurableMatrix} from './ConfigurableMatrix';
import {example} from '../example';
import {MemberInfo} from '../core/types';
import {analyzeSource} from '../core/parsers/typescript/analyzeSource';
import {Description} from './Description';
import {Title} from './Title';

interface AppState {
  code: string;
  members: MemberInfo[]
}

export class App extends React.Component<any, AppState> {
  constructor(props) {
    super(props);

    this.state = { code: example, members: [] }
  }

  onCodeChange = (newCode) => {
    this.setState({ code: newCode });
  };

  onAnalyze = async () => {
    const members = analyzeSource(this.state.code);
    this.setState({ members })
  };

  render() {
    return (
      <div>
        <div className="top">
          <Title />
          <Description />
          <SourcePanel code={this.state.code} onCodeChange={this.onCodeChange} onAnalyze={this.onAnalyze} />
        </div>
        <ConfigurableMatrix members={this.state.members} />
      </div>
    );
  }
}