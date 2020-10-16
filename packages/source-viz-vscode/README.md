# Source Viz

Source Viz is a VSCode extension for visualizing the relationship between a module's public API its implementations details.  

You can use it to
* Make changes with confidence
  * Quickly get a sense of what a module does (i.e. what are its exported functions) and how (i.e. using which helper functions \ imports).
* Find refactoring opportunities
  * Identify how to split-up a large file (e.g. if a single public method uses a completely different code path than the rest of the public methods).

## Functionality

Press Cmd\Ctrl+Shift+P and select "Open Source Viz" to see the diagram of the file you are currently editing.

![Demo screenshot](images/demo.png)

## Interpreting the results

The results are displayed in an [Adjacency Matrix](https://en.wikipedia.org/wiki/Adjacency_matrix).

![Annotated example matrix](images/annotated-example-matrix.png)

* The **rows** represent the module's public API.  
  These would be its exported functions.
* The **columns** represent the module's internal implementation  
  These would be:
  * 🔐 Non-exported (private) functions
  * 📦 Imported members (dependencies)
