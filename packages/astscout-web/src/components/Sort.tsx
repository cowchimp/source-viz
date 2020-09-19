import * as React from 'react';
import { Radio } from './Radio';
import { SortType } from '../core/view-model/view-config';

interface SortProps {
  onChange: (x: SortType) => void;
  active: SortType;
}

export function Sort(props: SortProps) {
  const { onChange, active } = props;

  return (
    <div className="control">
      Sort:
      <div>
        <Radio
          text="Alphabetical"
          type={SortType.alphabetical}
          group="sort"
          onChange={onChange}
          activeType={active}
        />
      </div>
      <div>
        <Radio
          text="Louvain"
          type={SortType.louvain}
          group="sort"
          onChange={onChange}
          activeType={active}
        />{' '}
        <a
          style={{ fontSize: '75%' }}
          href="https://en.wikipedia.org/wiki/Louvain_Modularity"
          target="_blank"
        >
          (What is this?)
        </a>
      </div>
      <div>
        <Radio
          text="Random"
          type={SortType.random}
          group="sort"
          onChange={onChange}
          activeType={active}
        />
      </div>
    </div>
  );
}
