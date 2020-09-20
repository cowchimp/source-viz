// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { Uri } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "hello-vscode-extension" is now active!',
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerTextEditorCommand(
    'astscout-vscode.helloWorld',
    (textEditor) => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage(
        'Hello World from Hello VSCode Extension!!!',
      );

      const panel = vscode.window.createWebviewPanel(
        'catCoding', // Identifies the type of the webview. Used internally
        'AST Scout', // Title of the panel displayed to the user
        vscode.ViewColumn.Beside, // Editor column to show the new webview panel in.
        {
          enableScripts: true,
        }, // Webview options. More on these later.
      );

      const content = textEditor.document.getText();

      console.log('context.extensionPath');
      const fullPath = path.join(
        context.extensionPath,
        'node_modules/astscout-vscode-web/dist/bundle.2347fcb486a536c4e2c5.js',
      );
      const uri = vscode.Uri.file(fullPath);
      console.log(uri);
      const webviewUri = panel.webview.asWebviewUri(uri);
      console.log(webviewUri);

      panel.webview.html = getWebviewContent(content, webviewUri);
    },
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(code: string, scriptUri: Uri) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto"
      rel="stylesheet"
    />
    <style type="text/css">
      .controls { font-family:'Roboto',sans-serif; }
      .controls { display:flow-root; }
      .control { float:left; margin-right:12px; }
      .hover-target { fill: transparent; }
      .hover-highlight { fill:#b3b3b3; fill-opacity:0.25; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.scoutCode = atob('${Buffer.from(code).toString('base64')}');
    </script>
    <script src="${scriptUri}"></script>
  </body>
</html>
`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
