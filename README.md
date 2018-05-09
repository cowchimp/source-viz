[![Travis](https://img.shields.io/travis/cowchimp/astscout.svg)](https://travis-ci.org/cowchimp/astscout)


# ⚜️ AST Scout

### [Demo](http://astscout.cowchimp.com)

AST Scout is a tool for analyzing and visualizing the relationship between a Class' public API and its implementations details (e.g. private methods, dependencies used).  
Ideally this visualization can help you spot logical split-points in a huge Class file by highlighting how one set of public methods uses completely different code than a different set.  
To use it just paste your code and click **Analyze**.  
Results are displayed in an [Adjacency Matrix](https://en.wikipedia.org/wiki/Adjacency_matrix).  
Right now it supports analyzing Typescript [Classes](https://www.typescriptlang.org/docs/handbook/classes.html) (the first one found in the source code), and treats constructor parameters as dependencies ([Angular 1.x](https://docs.angularjs.org/guide/di) style).  
Support for [ESM-based](https://ponyfoo.com/articles/es6-modules-in-depth) Typescript\Javascript scripts is coming soon. Support for other programming languages is also planned.  
Feel free to open up an issue or reach out on [twitter](https://twitter.com/cowchimp).

## Running tests

Run tests with `npm test`

## License

MIT
