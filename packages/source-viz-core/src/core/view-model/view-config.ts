import { MemberType } from '../types';

export enum AnalysisMode {
  class = 'class',
  module = 'module',
}

export enum SortType {
  alphabetical = 'alphabetical',
  random = 'random',
  louvain = 'louvain',
}

export interface ViewConfig {
  sort: SortType;
  columnFilters: Set<MemberType>;
  transitiveLinkFilters: Set<MemberType>;
  cellWidth: number;
  cellHeight: number;
}

export const defaultViewConfig: ViewConfig = {
  sort: SortType.louvain,
  columnFilters: new Set([MemberType.dependency, MemberType.privateMethod]),
  transitiveLinkFilters: new Set([MemberType.privateMethod]),
  cellWidth: 30,
  cellHeight: 30,
};
