import { MemberType } from './core/types';

export function getTypeEmoji(type: MemberType) {
  if (type == MemberType.dependency) {
    return '\u{1F4E6}'; // :package:
  }
  if (type == MemberType.privateMethod) {
    return '\u{1F510}'; // :closed_lock_with_key:
  }
  if (type == MemberType.publicMethod) {
    return '\u{1F513}'; // :unlock:
  }
  return '';
}
