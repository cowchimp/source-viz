# Source Viz

**Source Viz** is a tool for visualizing the relationship between a module's public API and its implementation details.  

You can use it to
* Make changes with confidence
  * Quickly get a sense of what a module does (i.e. what are its exported functions) and how (i.e. using which helper functions \ imports).
* Find refactoring opportunities
  * Identify how to split-up a large file (e.g. if a single public method uses a completely different code path than the rest of the public methods).

![Demo screenshot](/images/demo.png)

## How to use it?

**Source Viz** is available as

* [A VSCode extension](https://marketplace.visualstudio.com/items?itemName=cowchimp.source-viz-vscode)
* [An online playground \ Demo](https://source-viz.netlify.app)

## License

MIT
