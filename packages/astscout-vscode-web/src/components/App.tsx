import * as React from 'react';
import { analyzeModuleSource, ConfigurableMatrix } from 'astscout-core';
import type { MemberInfo } from 'astscout-core';

interface AppState {
  members: MemberInfo[];
}

export class App extends React.Component<any, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      // @ts-ignore
      members: analyzeModuleSource(window.scoutCode),
    };
  }

  render() {
    return <ConfigurableMatrix members={this.state.members} />;
  }
}
