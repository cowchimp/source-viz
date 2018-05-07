import * as React from 'react';
import * as CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

export function SourceEditor({code, onChange, onSubmit}) {
  return (
    <CodeMirror value={code}
                onChange={onChange}
                options={{
                  lineNumbers: true,
                  mode: 'application/typescript',
                  extraKeys: {
                    'Cmd-Enter': onSubmit,
                    'Alt-Enter': onSubmit
                  }
                }} />
  );
}
