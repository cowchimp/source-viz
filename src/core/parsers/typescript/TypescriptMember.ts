import * as ts from 'typescript';
import {MemberInfo, MemberType} from '../../types';
import {TypescriptAst} from './TypescriptAst';
import {getReferencingMethods} from './getReferencingMethods';

export class TypescriptMember {
  constructor(
    public node: ts.NamedDeclaration,
    public type: MemberType) {
  }

  public getMemberInfo(ast: TypescriptAst, members: TypescriptMember[] = []): MemberInfo {
    return {
      label: this.getLabel(this.node, ast),
      type: this.type,
      referencingMethods: getReferencingMethods(this.node, members, ast).map(x => this.getLabel(x, ast))
    }
  }

  private getLabel(node: ts.NamedDeclaration, ast: TypescriptAst): string {
    if(this.isAnonymousDefaultFunction(node) || this.isAnonymousDefaultArrowFunction(node)) {
      return 'default';
    }
    return ast.getName(node);
  }

  private isAnonymousDefaultFunction(node: ts.NamedDeclaration) {
    return ts.isFunctionDeclaration(node) &&
      !node.name &&
      node.modifiers.some(m => m.kind == ts.SyntaxKind.DefaultKeyword);
  }

  private isAnonymousDefaultArrowFunction(node: ts.NamedDeclaration) {
    return ts.isExportAssignment(node);
  }
}
