# serverless-ts-npm-workspaces

Work in progress that utilizes serverless, typescript composite builds, and npm workspaces

## Table of Contents

* [Dependencies](#dependencies)
* [Packages](#packages)
    * [Creation](#creation)
    * [Configuration](#configuration)
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

### Creation

* to create a new package under `packages/`: `npm run create-package <package-name>`

### Configuration

See [Package Configuration](./docs/Package_Configration.md)

## Tests

### Unit

* run all tests: `npm run test`
* run a subset of tests: `npm run test -- --testPathPattern packages/<package-name>`

## Build

* build all: `npm run -ws build`
* build individual: `npm run -w=packages/<package-name> build`

## Publish

* `npm login`
* publish all: `npm publish -ws --access public`
* publish individual: `npm publish -w=packages/<package-name> --access public`

[packages](https://www.npmjs.com/org/serverless-ts-npm-workspaces) are published under the scope `@serverless-ts-npm-workspaces`

## Serverless

### Running locally

`npm run local` will utilize [serverless-offline](https://www.npmjs.com/package/serverless-offline) to spin up serverless functions on `localhost`
