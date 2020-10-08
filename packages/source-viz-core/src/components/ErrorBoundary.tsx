import * as React from 'react';

interface ErrorBoundaryProps {
  renderError(error: Error): React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  render() {
    if (this.state.error) {
      return this.props.renderError(this.state.error);
    }

    return this.props.children;
  }
}
