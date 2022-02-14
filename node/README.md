# node

Typescript packages

## Workspaces

This project makes use of [NPM Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

* There is a root `package.json` and `node_modules`
* Directories in `packages/*` are sub node packages and can have their own dependencies / `node_modules`, but they can also make use of hoisted directories in the project root, as well as other sibling packages
    * e.g. many dev dependencies are installed via the root `package.json` and shared between sub packages
* Typescript is configured with path mapping, so sub package `a` can import from `b` like so, `import { BFooClass } from 'b/BFooClass'`

## Tests

There is one root jest config responsible for running all tests.

* run tests: `npm run test`
* run a subset of tests: `npm run test -- --testPathPattern packages/handlers/`
