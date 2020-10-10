import * as React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

export function SourceEditor({ initialCode, onChange, onSubmit }) {
  return (
    <CodeMirror
      value={initialCode}
      onChange={(editor, data, value) => onChange(value)}
      options={{
        lineNumbers: true,
        mode: 'application/typescript',
        extraKeys: {
          'Cmd-Enter': onSubmit,
          'Alt-Enter': onSubmit,
        },
      }}
    />
  );
}
