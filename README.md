# serverless-ts-npm-workspaces

## Table of Contents

* [Dependencies](#dependencies)
* [Packages](#packages)
    * [Workspaces](#workspaces)
    * [Typescript](#typescript)
    * [Adding a new package](#adding-a-new-package)
* [Tests](#tests)
    * [Unit](#unit)
* [Build](#build)
* [Serverless](#serverless)

## Dependencies

* node 14
* run `npm install`

## Packages

### Workspaces

* `packages/` contains [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) 
    * related projects can share the same development environmet 
    * managed by a top level `package.json`
    * flexibility to publish packages to an npm registry
    * common dependenices are hoisted into the `node_modules/` in the project root instead of downloaded multiple times

### Typescript

* [composite](https://www.typescriptlang.org/tsconfig#composite) project
    * packages are independently compiled, which greatly speeds up build time
* [path mappings](https://www.typescriptlang.org/tsconfig#paths) are defined in `tsconfig-base.json`
    * avoids imports that rely on relative paths, e.g. `import { foo } from '../../foo` vs `import { foo } from '@/foo`

### Adding a new package

run `npm run create-package <package-name>` to create and configure a new package, see [Package Configuration](./docs/Package_Configration.md) for details on configuration

## Tests

### Unit

* run all tests: `npm run test`
* run a subset of tests: `npm run test -- --testPathPattern packages/<package-name>`

## Build

`npm run build`

## Serverless

### Running locally

`npm run local` will utilize [serverless-offline](https://www.npmjs.com/package/serverless-offline) to spin up serverless functions on `localhost`
