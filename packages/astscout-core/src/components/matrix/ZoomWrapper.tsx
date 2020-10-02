import * as React from 'react';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';

interface ZoomWrapperProps {
  width: number;
  height: number;
  children: React.ReactNode;
}

export class ZoomWrapper extends React.Component<ZoomWrapperProps, any> {
  private Viewer: any;
  constructor(props) {
    super(props);
    this.Viewer = null;
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  render() {
    return (
      <React.StrictMode>
        <UncontrolledReactSVGPanZoom
          width={this.props.width}
          height={this.props.height}
          ref={(Viewer) => (this.Viewer = Viewer)}
          defaultTool="zoom-in"
          toolbarProps={{ position: 'left' }}
          miniatureProps={{ position: 'none' }}
          detectAutoPan={false}
          detectWheel={false}
          detectPinchGesture={true}
          preventPanOutside={true}
        >
          {this.props.children}
        </UncontrolledReactSVGPanZoom>
      </React.StrictMode>
    );
  }
}
