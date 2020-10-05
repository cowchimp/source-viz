import * as React from 'react';
import { analyzeModuleSource, ConfigurableMatrix } from 'astscout-core';

export function App() {
  // @ts-ignore
  const code = window.scoutCode;
  const members = analyzeModuleSource(code);
  return <ConfigurableMatrix members={members} />;
}
