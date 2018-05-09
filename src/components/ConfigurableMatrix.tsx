import * as React from 'react';
import {getMatrixModel} from '../core/view-model/getMatrixModel';
import {Controls} from './Controls';
import {Matrix} from './Matrix';
import {defaultViewConfig, ViewConfig} from '../core/view-model/view-config';
import {MemberInfo} from '../core/types';

interface ConfigurableMatrixProps {
  members: MemberInfo[];
}

export class ConfigurableMatrix extends React.Component<ConfigurableMatrixProps, ViewConfig> {
  constructor(props) {
    super(props);

    this.state = defaultViewConfig;
  }

  onViewConfigChange = (newState) => {
    this.setState(newState);
  };

  getViewModel(members, viewConfig: ViewConfig) {
    return Object.assign({}, getMatrixModel([].concat(members), viewConfig), viewConfig);
  }

  render() {
    if(!this.props.members || !this.props.members.length) {
      return null;
    }

    return [
      <Controls key="controls"
                viewConfig={this.state}
                onChange={this.onViewConfigChange}
                members={this.props.members} />,
      <Matrix key="matrix" {...this.getViewModel(this.props.members, this.state)} />
    ];
  }
}