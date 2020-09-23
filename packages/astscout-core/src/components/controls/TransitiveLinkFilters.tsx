import * as React from 'react';
import { Checkbox } from './Checkbox';
import { MemberType } from '../../core/types';
import { getTypeEmoji } from '../../getTypeEmoji';

interface TransitiveLinkFilterProps {
  onChange: (x: Set<MemberType>) => void;
  active: Set<MemberType>;
}

export function TransitiveLinkFilters(props: TransitiveLinkFilterProps) {
  return (
    <div className="control">
      Transitive links:
      <div>
        <Checkbox
          text={`${getTypeEmoji(MemberType.privateMethod)}Private Method`}
          type={MemberType.privateMethod}
          group="transitiveLinkFilters"
          onChange={onChange}
          activeTypes={props.active}
        />
      </div>
      <div>
        <Checkbox
          text={`${getTypeEmoji(MemberType.publicMethod)}Public Method`}
          type={MemberType.publicMethod}
          group="transitiveLinkFilters"
          onChange={onChange}
          activeTypes={props.active}
        />
      </div>
    </div>
  );

  function onChange(value: MemberType, checked: boolean): void {
    const newActiveFilters = new Set(props.active);
    newActiveFilters[checked ? 'add' : 'delete'](value);
    props.onChange(newActiveFilters);
  }
}
