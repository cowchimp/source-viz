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
      label: ast.getName(this.node),
      type: this.type,
      referencingMethods: getReferencingMethods(this.node, members, ast)
    }
  }
}
