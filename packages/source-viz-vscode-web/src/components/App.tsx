import * as React from 'react';
import { AnalysisMode, CodeMatrix } from 'source-viz-core';

export function App() {
  // @ts-ignore
  const code = window.scoutCode;
  return <CodeMatrix code={code} mode={AnalysisMode.module} />;
}
