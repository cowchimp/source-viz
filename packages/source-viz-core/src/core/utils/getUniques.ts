function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

export function getUniques<T>(...args: T[][]) {
  return Array.from(new Set(flatten(args)));
}
