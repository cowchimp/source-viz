export function getDescendants<T>(root: T, getChildren: (item: T) => T[]): T[] {
  const results = [];
  inner(root);
  return results;

  function inner(item: T): void {
    getChildren(item).forEach((x) => {
      if (!results.includes(x)) {
        results.push(x);
        inner(x);
      }
    });
  }
}
