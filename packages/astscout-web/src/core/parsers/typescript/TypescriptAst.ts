import * as ts from 'typescript';

export class TypescriptAst {
  private _sourceFile: ts.SourceFile;
  private _nodes: ts.Node[] = [];
  private _nodeParents: Map<ts.Node, ts.Node> = new Map<ts.Node, ts.Node>();
  private _nodePositions: Map<number, ts.Node> = new Map<number, ts.Node>();
  private _languageService: ts.LanguageService;

  constructor(private code: string) {
    const fileName = 'source.ts';
    this._sourceFile = ts.createSourceFile(fileName, code, ts.ScriptTarget.ES5);
    this._languageService = ts.createLanguageService(new InMemoryLanguageServiceHost({[fileName]: code}))
    this.visit(this._sourceFile, undefined, (node, parent) => {
      this._nodes.push(node);
      this._nodeParents.set(node, parent);
      this._nodePositions.set(node.getStart(this._sourceFile), node)
    });
  }

  get nodes(): ts.Node[] {
    return this._nodes;
  }

  getReferences(identifier: ts.Identifier): ts.Node[] {
    const position = identifier.getStart(this._sourceFile);

    const referencedSymbols = this._languageService.findReferences(this._sourceFile.fileName, position);
    const referenceEntries = referencedSymbols.reduce<ts.ReferenceEntry[]>((acc, symbol) => acc.concat(symbol.references), []);
    const referencePositions = referenceEntries.map(x => x.textSpan.start);

    return referencePositions.map(x => this._nodePositions.get(x));
  }

  getParent(node: ts.Node): ts.Node | undefined {
    return this._nodeParents.get(node);
  }

  getFullText(node: ts.Node): string {
    return node.getFullText(this._sourceFile);
  }

  getName(node: ts.NamedDeclaration): string {
    if (!node.name || !ts.isIdentifier(node.name)) {
      throw new Error("must be able to parse NamedDeclaration's name");
    }
    return node.name.text;
  }

  private visit(node: ts.Node, parent: ts.Node | undefined, cb: (node: ts.Node, parent: ts.Node | undefined) => void) {
    cb(node, parent);
    ts.forEachChild(node, n => n && this.visit(n, node, cb));
  }
}

class InMemoryLanguageServiceHost implements ts.LanguageServiceHost {
  constructor(private files: ts.MapLike<string>) {}

  getCompilationSettings(): ts.CompilerOptions {
    const opts = ts.getDefaultCompilerOptions();
    opts.noLib = true;
    return opts;
  }

  getScriptFileNames(): string[] {
    return Object.keys(this.files);
  }

  getScriptVersion(fileName: string): string {
    return '0';
  }

  getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined {
    return ts.ScriptSnapshot.fromString(this.files[fileName]);
  }

  getCurrentDirectory() {
    return '';
  }

  getDefaultLibFileName(options: ts.CompilerOptions): string {
    return ts.getDefaultLibFilePath(options);
  }

  getNewLine(): string {
    return '\n'
  }
}