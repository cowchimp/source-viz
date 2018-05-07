export interface RowItem {
  label: string;
  type: string;
}

interface Link {
  row: string;
  column: string;
}

export interface MatrixModel {
  rows: string[];
  columns: RowItem[];
  links: Link[]
}

export function createMatrixModel(rowsToRowItems: Map<RowItem, RowItem[]>): MatrixModel {
  const rows = [], columns = [], links = [];

  rowsToRowItems.forEach((rowItems, {label: row}) => {
    rows.push(row);
    rowItems.forEach(column => {
      if (!columns.some(x => x.label == column.label)) {
        columns.push(column);
      }
      links.push({row, column})
    });
  });

  return { rows, columns, links };
}
