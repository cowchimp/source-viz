import { Link } from './matrix-model';

export function getSortByEmptyRowsLastFunc(
  rows: string[],
  links: Link[],
): (a: string, b: string) => number {
  const { emptyRows, nonEmptyRows } = splitEmptyAndNonEmptyRows(rows, links);

  return (a, b) => {
    if (emptyRows.includes(a) && nonEmptyRows.includes(b)) {
      return 1;
    }
    if (emptyRows.includes(b) && nonEmptyRows.includes(a)) {
      return -1;
    }
    return 0;
  };

  function splitEmptyAndNonEmptyRows(rows: string[], links: Link[]) {
    return rows.reduce(
      (acc, row) => {
        if (isEmptyRow(row, links)) {
          acc.emptyRows.push(row);
        } else {
          acc.nonEmptyRows.push(row);
        }
        return acc;
      },
      { emptyRows: [], nonEmptyRows: [] },
    );
  }

  function isEmptyRow(row: string, links: Link[]): boolean {
    return !links.some((x) => x.row === row);
  }
}
