[![Travis](https://img.shields.io/travis/cowchimp/astscout.svg)](https://travis-ci.org/cowchimp/astscout)

# ⚜️ AST Scout

> Check out [this blog post](https://blog.yonatan.dev/ast-scout-code-structure-visualization-tool) to learn about AST Scout.

### [Demo](http://astscout.cowchimp.com)

AST Scout is a tool for analyzing and visualizing the relationship between the public API of a Class\Module and its implementations details (e.g. private methods, dependencies used).  
Ideally this visualization can help you spot logical split-points in a huge Class\Module file by highlighting how one set of public methods uses completely different code than a different set.  
To use it just paste your code and click **Analyze**.  
Results are displayed in an [Adjacency Matrix](https://en.wikipedia.org/wiki/Adjacency_matrix).  
Right now it supports analyzing [Typescript](https://www.typescriptlang.org) (and therefore Javascript as well).  
Support for other programming languages is also planned.  
Feel free to open up an issue or reach out on [twitter](https://twitter.com/cowchimp).

## Running tests

Run tests with `npm test`

## License

MIT
