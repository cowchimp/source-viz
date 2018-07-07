import * as React from 'react';
import {SourceEditor} from './SourceEditor';

export function SourcePanel({initialCode, code, onCodeChange, onAnalyze}) {
  return (
    <div className="source">
      <SourceEditor initialCode={initialCode} onChange={onCodeChange} onSubmit={onAnalyze} />
      <button className="btn" onClick={onAnalyze}>Analyze</button>
      {code && code.length && <div className="loc">{code.split('\n').length} lines</div>}
    </div>
  );
}