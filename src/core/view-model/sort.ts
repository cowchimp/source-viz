import {jLouvain} from 'louvain';
import * as shuffle from 'lodash.shuffle';
import {SortType} from './view-config';

const sortFuncs = {
  [SortType.alphabetical]: sortByAlphabetical,
  [SortType.random]: sortByRandom,
  [SortType.louvain]: sortByLouvain
};

export function sort(model, sortType: SortType) {
  return sortFuncs[sortType](model);
}

function sortByAlphabetical(model) {
  model.rows.sort((a, b) => a.localeCompare(b));
  model.columns.sort((a, b) => a.label.localeCompare(b.label));
}

function sortByRandom(model) {
  model.rows = shuffle(model.rows);
  model.columns = shuffle(model.columns);
}

function sortByLouvain(model) {
  const nodes = model.rows.concat(model.columns.map(x => x.label));
  const edges = model.links.map(x => ({source: x.row, target: x.column.label, value: 1}));
  const community = jLouvain().nodes(nodes).edges(edges);
  const sorted = community();

  model.rows.sort((a, b) => sorted[a] - sorted[b]);
  model.columns.sort((a, b) => sorted[a.label] - sorted[b.label]);
}
