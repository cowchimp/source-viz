import * as React from 'react';

export function Description() {
  return (
    <div className="description">
      <p>
        Source Viz is a tool for analyzing and visualizing the relationship
        between the public API of a Module\Class and its implementation details
        (e.g. private methods, dependencies used).
      </p>
      <p>
        Ideally this visualization can help you spot logical split-points in a
        huge Module\Class file by highlighting how one set of public methods
        uses completely different code than a different set.
      </p>
      <p>
        To use it just paste your code below and click <strong>Analyze</strong>.
      </p>
      <p>
        Results are displayed in an{' '}
        <a
          href="https://en.wikipedia.org/wiki/Adjacency_matrix"
          target="_blank"
        >
          Adjacency Matrix
        </a>
        .
      </p>
      <p>
        Right now it supports analyzing{' '}
        <a href="https://www.typescriptlang.org" target="_blank">
          Typescript
        </a>{' '}
        (and therefore Javascript as well).
        <br />
        Support for other programming languages is also planned.
      </p>
      <p>
        Feel free to open up an issue on{' '}
        <a href="https://www.github.com/cowchimp/source-viz" target="_blank">
          github
        </a>{' '}
        or reach out on{' '}
        <a href="https://twitter.com/cowchimp" target="_blank">
          twitter
        </a>
        .
      </p>
    </div>
  );
}
