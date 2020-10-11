import * as React from 'react';
import { GithubLogo } from './GithubLogo';
import { VsCodeLogo } from './VsCodeLogo';

const pkg = require('../../package.json');

export function Title() {
  return (
    <h1 className="title code">
      Source Viz <span style={{ fontSize: '50%' }}>(v{pkg.version})</span>{' '}
      <GithubLogo /> <VsCodeLogo />
    </h1>
  );
}
