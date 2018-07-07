import * as React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

export function SourceEditor({code, onChange, onSubmit}) {
  return (
    <CodeMirror value={code}
                onChange={(editor, data, value) => onChange(value)}
                options={{
                  lineNumbers: true,
                  mode: 'application/typescript',
                  extraKeys: {
                    'Cmd-Enter': onSubmit,
                    'Alt-Enter': onSubmit
                  }
                }}/>
  );
}
