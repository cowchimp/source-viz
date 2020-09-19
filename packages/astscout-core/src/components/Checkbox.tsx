import * as React from 'react';

interface CheckboxProps {
  text: string;
  count?: number;
  type: string;
  group: string;
  onChange: (value: string, checked: boolean) => void;
  activeTypes: Set<any>;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <label>
      <input
        type="checkbox"
        name={props.group}
        value={props.type}
        onChange={(e) => props.onChange(e.target.value, e.target.checked)}
        checked={props.activeTypes.has(props.type)}
      />
      {props.text} {props.count && <strong>{`(${props.count})`}</strong>}
    </label>
  );
}
