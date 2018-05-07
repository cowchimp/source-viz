import * as React from 'react';

export function Description() {
  return (
    <div className="description">
      <p>AST Scout is a tool for analyzing and visualizing the relationship between a Class' public API and its implementations details (e.g. private methods, dependencies used).</p>
      <p>Ideally this visualization can help you spot logical split-points in a huge Class file by highlighting how one set of public methods uses completely different code than a different set.</p>
      <p>To use it just paste your code below and click <strong>Analyze</strong>.</p>
      <p>Results are displayed in an <a href="https://en.wikipedia.org/wiki/Adjacency_matrix" target="_blank">Adjacency Matrix</a>.</p>
      <p>Right now it supports analyzing Typescript <a href="https://www.typescriptlang.org/docs/handbook/classes.html" target="_blank">Classes</a> (the first one found in the source code), and treats constructor parameters as dependencies (<a href="https://docs.angularjs.org/guide/di" target="_blank">Angular 1.x</a> style).</p>
      <p>Support for <a href="https://ponyfoo.com/articles/es6-modules-in-depth" target="_blank">ESM-based</a> Typescript\Javascript scripts is coming soon. Support for other programming languages is also planned.</p>
      <p>Feel free to open up an issue on <a href="https://www.github.com/cowchimp/astscout" target="_blank">github</a> or reach out on <a href="https://twitter.com/cowchimp" target="_blank">twitter</a>.</p>
    </div>
  );
}
