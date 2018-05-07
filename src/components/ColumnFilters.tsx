import * as React from 'react';
import {Checkbox} from './Checkbox';
import {getTypeEmoji} from '../getTypeEmoji';
import {MemberType} from '../core/types';

interface ColumnFilterProps {
  onChange: (x: Set<MemberType>) => void;
  active: Set<MemberType>;
}

export function ColumnFilters(props: ColumnFilterProps) {
  return (
    <div className="control">
      Columns:
      <div>
        <Checkbox text={`${getTypeEmoji(MemberType.dependency)}Dependency`}
                     type={MemberType.dependency}
                     group="columnFilters"
                     onChange={onChange}
                     activeTypes={props.active} />
      </div>
      <div>
        <Checkbox text={`${getTypeEmoji(MemberType.privateMethod)}Private Method`}
                     type={MemberType.privateMethod}
                     group="columnFilters"
                     onChange={onChange}
                     activeTypes={props.active} />
      </div>
      <div>
        <Checkbox text={`${getTypeEmoji(MemberType.publicMethod)}Public Method`}
                  type={MemberType.publicMethod}
                  group="columnFilters"
                  onChange={onChange}
                  activeTypes={props.active} />
      </div>
    </div>
  );

  function onChange(value: MemberType, checked: boolean): void {
    if(props.active.size == 1 && !checked) {
      return;
    }

    const newActiveFilters = new Set(props.active);
    newActiveFilters[checked ? 'add' : 'delete'](value);
    props.onChange(newActiveFilters)
  }
}

