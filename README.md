# serverless-ts-npm-workspaces

Work in progress that utilizes serverless, typescript composite builds, and npm workspaces

## Table of Contents

* [Dependencies](#dependencies)
* [Packages](#packages)
    * [Workspaces](#workspaces)
    * [Typescript](#typescript)
    * [Adding a new package](#adding-a-new-package)
* [Tests](#tests)
    * [Unit](#unit)
* [Build](#build)
* [Publish](#publish)
* [Serverless](#serverless)

## Dependencies

* node 14
* npm 7+
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
    * packages are incrementally compiled which greatly speeds up build time
* [path mappings](https://www.typescriptlang.org/tsconfig#paths) are defined in `tsconfig-base.json`
    * avoids imports that rely on relative paths, e.g. `import { foo } from '../../foo/src'` vs `import { foo } from '@serverless-ts-npm-workspaces/foo'`

### Adding a new package

run `npm run create-package <package-name>` to create and configure a new package, see [Package Configuration](./docs/Package_Configration.md) for details on configuration

## Tests

### Unit

* run all tests: `npm run test`
* run a subset of tests: `npm run test -- --testPathPattern packages/<package-name>`

## Build

* build all: `npm run -ws build`
* build individual: `npm run -w=packags/<package-name> build`

## Publish

* `npm login`
* publish all: `npm publish -ws --access public`
* publish individual: `npm publish -w=packages/<package-name> --access public`

[packages](https://www.npmjs.com/org/serverless-ts-npm-workspaces) are published under the scope `@serverless-ts-npm-workspaces`

## Serverless

### Running locally

`npm run local` will utilize [serverless-offline](https://www.npmjs.com/package/serverless-offline) to spin up serverless functions on `localhost`
