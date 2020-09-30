import * as React from 'react';

interface ZoomWrapperProps {
  children?(zoomedOut: boolean): React.ReactNode;
}

export class ZoomWrapper extends React.Component<ZoomWrapperProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      zoomedOut: true,
    };
  }

  private onCanvasClick = (e) => {
    e.persist();
    this.setState({
      zoomedOut: !this.state.zoomedOut,
    });
  };

  render() {
    return (
      <div
        style={{
          cursor: this.state.zoomedOut ? 'zoom-in' : 'zoom-out',
        }}
        onClick={this.onCanvasClick}
      >
        {this.props.children(this.state.zoomedOut)}
      </div>
    );
  }
}
