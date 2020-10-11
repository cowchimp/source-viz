import * as React from 'react';
import { AnalysisMode, SourceMatrix } from 'source-viz-core';

export function App() {
  // @ts-ignore
  const source = window.scoutCode;
  return <SourceMatrix source={source} mode={AnalysisMode.module} />;
}
