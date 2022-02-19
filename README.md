# serverless-ts-npm-workspaces

## Table of Contents

* [Dependencies](#dependencies)
* [Workspaces](#workspaces)
* [Typeescript](#typescript)
* [Tests](#tests)
    * [Unit](#unit)
* [Build](#build)
* [Adding a new package](#adding-a-new-package)

## Dependencies

* Ensure you have node 12+
* run `npm install`

## Workspaces

* directories in `packages/` are [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) 
    * related projects can share the same development environemt 
    * flexibility to publish packages to an npm registry, some webpack will need to be involved in the build process to sort dependencies
    * common dependenices are hoisted into the `node_modules/` in the project root instead of downloaded multiple times

## Typescript

* [composite](https://www.typescriptlang.org/tsconfig#composite) project
    * packages are independently compiled, which greatly speeds up development time
    * utilizes [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) when importing code between packages
* [path mappings](https://www.typescriptlang.org/tsconfig#paths) are defined in `tsconfig-base.json`
    * avoids imports that rely on relative paths, e.g. `import { foo } from '../../foo` vs `import { foo } from '@/foo`

## Tests

### Unit

* run all tests: `npm run test`
* run a subset of tests: `npm run test -- --testPathPattern packages/<package-name>`

## Build

`npm run build`

## Adding a new package

To see the configuration required to add a new package, see [Package Configuration](./docs/Package_Configration.md)
