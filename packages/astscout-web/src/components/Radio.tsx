import * as React from 'react';

export function Radio({text, type, group, onChange, activeType}) {
  return <label>
    <input type="radio"
           name={group}
           value={type}
           onChange={(e) => onChange(e.target.value)}
           checked={activeType === type}/>
    {text}
  </label>
}