# node

Typescript packages

## Dependencies

* Ensure you have node 12+
* run `npm install`

## Workspaces

This project makes use of [NPM Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces), this allows to break up our code into lighterweight packages. Each package tracks its own prod depedencies in a `package.json`, but when installed, common dependenices are hoisted into the `node_modules` in the project root instead of downloaded multiple times

## Typescript

* [path mappings](https://www.typescriptlang.org/tsconfig#paths) are defined in `tsconfig-base.json`, this allows us to avoid imports that rely on relative paths, e.g. `import { foo } from '../../foo` vs `import { foo } from '@/foo`
* `src` and `tests` directories in our packages all have their own `tsconfig.json` that extends the `tsconfig-base.json` in the project root
* this project utilizes [project references](https://www.typescriptlang.org/docs/handbook/project-references.html)
    * allows to import code between packages without having to include them in eachothers `package.json`
    * we can use the `tsc --build` flag allowing for incremental compilation of packages

## Tests

There is one root jest config responsible for running all tests

* run tests: `npm run test`
* run a subset of tests: `npm run test -- --testPathPattern packages/<package-name>`

## Build

run `npm run build`
