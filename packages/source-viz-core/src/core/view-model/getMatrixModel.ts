import { sort } from './sort';
import { ViewConfig } from './view-config';
import { MemberInfo, MemberType } from '../types';
import { groupPublicMethodsToReferencedMembers } from '../groupPublicMethodsToReferencedMembers';
import { createMatrixModel, MatrixModel } from './matrix-model';

export function getMatrixModel(
  members: MemberInfo[],
  viewConfig: ViewConfig,
): MatrixModel {
  const membersToLinkedMembers = groupPublicMethodsToReferencedMembers(
    members,
    viewConfig.transitiveLinkFilters,
  );

  filter(membersToLinkedMembers, viewConfig.columnFilters);

  const model = createMatrixModel(membersToLinkedMembers);

  sort(model, viewConfig.sort);

  return model;
}

function filter(
  model: Map<MemberInfo, MemberInfo[]>,
  columnFilters: Set<MemberType>,
): void {
  model.forEach((value, key) => {
    return model.set(
      key,
      value.filter((y) => columnFilters.has(y.type)),
    );
  });
}
