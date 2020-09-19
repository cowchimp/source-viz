import * as React from 'react';
import { Checkbox } from './Checkbox';
import { getTypeEmoji } from '../getTypeEmoji';
import { MemberInfo, MemberType } from '../core/types';

interface ColumnFilterProps {
  onChange: (x: Set<MemberType>) => void;
  active: Set<MemberType>;
  members: MemberInfo[];
}

export function ColumnFilters(props: ColumnFilterProps) {
  const counts = {
    [MemberType.dependency]: props.members.filter(
      (x) => x.type == MemberType.dependency,
    ).length,
    [MemberType.privateMethod]: props.members.filter(
      (x) => x.type == MemberType.privateMethod,
    ).length,
    [MemberType.publicMethod]: props.members.filter(
      (x) => x.type == MemberType.publicMethod,
    ).length,
  };

  return (
    <div className="control">
      Columns:
      <div>
        <Checkbox
          text={`${getTypeEmoji(MemberType.dependency)}Dependency`}
          count={counts[MemberType.dependency]}
          type={MemberType.dependency}
          group="columnFilters"
          onChange={onChange}
          activeTypes={props.active}
        />
      </div>
      <div>
        <Checkbox
          text={`${getTypeEmoji(MemberType.privateMethod)}Private Method`}
          count={counts[MemberType.privateMethod]}
          type={MemberType.privateMethod}
          group="columnFilters"
          onChange={onChange}
          activeTypes={props.active}
        />
      </div>
      <div>
        <Checkbox
          text={`${getTypeEmoji(MemberType.publicMethod)}Public Method`}
          count={counts[MemberType.publicMethod]}
          type={MemberType.publicMethod}
          group="columnFilters"
          onChange={onChange}
          activeTypes={props.active}
        />
      </div>
    </div>
  );

  function onChange(value: MemberType, checked: boolean): void {
    if (props.active.size == 1 && !checked) {
      return;
    }

    const newActiveFilters = new Set(props.active);
    newActiveFilters[checked ? 'add' : 'delete'](value);
    props.onChange(newActiveFilters);
  }
}
