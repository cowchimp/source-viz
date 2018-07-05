import * as React from 'react';
import {AnalysisMode} from '../core/view-model/view-config';

interface ModeProps {
  value: AnalysisMode;
  onChange: (string) => void;
}

const titles = {
  [AnalysisMode.class]: 'Class-based',
  [AnalysisMode.module]: 'Module-based'
};

export function Mode(props: ModeProps) {
  return (
    <div className="mode">
      <strong>Mode: </strong>
      <select value={props.value} onChange={(e) => props.onChange(e.target.value)}>
        <ModeOption mode={AnalysisMode.class} />
        <ModeOption mode={AnalysisMode.module} />
      </select>
    </div>
  );
}

function ModeOption({mode}) {
  return (
    <option value={mode}>
      {titles[mode]}
    </option>
  );
}
