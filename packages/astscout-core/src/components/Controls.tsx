import * as React from 'react';
import { Zoom } from './Zoom';
import { Sort } from './Sort';
import { ColumnFilters } from './ColumnFilters';
import { TransitiveLinkFilters } from './TransitiveLinkFilters';
import { ViewConfig } from '../core/view-model/view-config';
import { MemberInfo } from '../core/types';

interface ControlsProps {
  viewConfig: ViewConfig;
  onChange: (o: {}) => void;
  members: MemberInfo[];
}

export function Controls(props: ControlsProps) {
  const { viewConfig, onChange, members } = props;

  return (
    <div className="controls">
      <ColumnFilters
        active={viewConfig.columnFilters}
        onChange={(x) => onChange({ columnFilters: x })}
        members={members}
      />
      <Sort active={viewConfig.sort} onChange={(x) => onChange({ sort: x })} />
      <TransitiveLinkFilters
        active={viewConfig.transitiveLinkFilters}
        onChange={(x) => onChange({ transitiveLinkFilters: x })}
      />
      <Zoom
        activeZoom={viewConfig.zoomRatio}
        onZoomChange={(z) => onChange({ zoomRatio: z })}
      />
    </div>
  );
}
