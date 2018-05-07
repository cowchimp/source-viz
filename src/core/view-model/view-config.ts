import {MemberType} from '../types';

export enum SortType {
  alphabetical = "alphabetical",
  random = "random",
  louvain = "louvain"
}

export interface ViewConfig {
  sort: SortType;
  columnFilters: Set<MemberType>;
  transitiveLinkFilters: Set<MemberType>
  zoomRatio: number,
  cellWidth: number;
  cellHeight: number;
}

export const defaultViewConfig: ViewConfig = {
  sort: SortType.louvain,
  columnFilters: new Set([ MemberType.dependency, MemberType.privateMethod ]),
  transitiveLinkFilters: new Set([ MemberType.privateMethod ]),
  zoomRatio: 1,
  cellWidth: 30,
  cellHeight: 30
};
