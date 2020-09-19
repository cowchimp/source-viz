import * as React from 'react';
import { GithubLogo } from './GithubLogo';

const pkg = require('../../package.json');

export function Title() {
  return (
    <h1 className="title code">
      {'\u{269C}'} AST Scout{' '}
      <span style={{ fontSize: '50%' }}>(v {pkg.version})</span>
      <GithubLogo />
    </h1>
  );
}
