export enum MemberType {
  dependency = 'dependency',
  privateMethod = 'privateMethod',
  publicMethod = 'publicMethod',
}

export interface MemberInfo {
  label: string;
  type: MemberType;
  referencingMethods: string[];
}
