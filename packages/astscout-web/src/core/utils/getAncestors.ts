export function getAncestors<T>(node: T, getParent: (node: T) => T): T[] {
  const ancestors = [];
  forEachAncestor(node, x => ancestors.push(x));
  return ancestors;

  function forEachAncestor(node: T, callback: (node: T) => void): void {
    const parent = getParent(node);
    if (!parent) {
      return;
    }
    callback(parent);
    forEachAncestor(parent, callback);
  }
}