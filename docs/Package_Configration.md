# Package Configuration

Some configration is used to make use of npm workspaces, typescript composite projects, and jest work

## Table of Contents

* [Features](#features)
    * [Workspaces](#workspaces)
    * [Typescript](#typescript)
* [Creation](#creation)
* [File Structure](#file-structure)
* [Package.json](#packagejson)
* [Ts Config](#ts-config)
    * [project root](#project-root)
    * [src](#src)
    * [tests](#tests)
* [Jest](#jest)

## Features

### Workspaces

* `packages/` contains [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) 
    * related projects can share the same development environmet 
    * managed by a top level `package.json`
    * flexibility to publish packages to an npm registry
    * common dependenices are hoisted into the `node_modules/` in the project root instead of downloaded multiple times

### Typescript

* [composite](https://www.typescriptlang.org/tsconfig#composite) project
    * packages are incrementally compiled
* [path mappings](https://www.typescriptlang.org/tsconfig#paths) are defined in `tsconfig-base.json`
    * avoids imports from other packages that rely on relative paths, e.g. `import { foo } from '../../foo/src'` vs `import { foo } from '@serverless-ts-npm-workspaces/foo'`
        * **Note** still use relative paths when importing from the same package or it would cause issues for consumers of a published npm package

## Creation

run `npm run create-package <package-name>` to setup a new package

* creates file structure
* creates/updates package.json files
* creates/updates tsconfigs
* updates jest config

## File Structure

```
├── packages
│   ├── <package-name>
│   │   ├── package.json
│   │   ├── src
│   │   |   ├── tsconfig.json
│   │   ├── tests
│   │   |   ├── tsconfig.json
```

## Package.json

### project root

`package.json`

```
{
    ...
    "workspaces": [
        ...other workspaces
        "packages/<package-name>"
    ]
}
```

### package root

`packages/<package-name>/package.json`

```
{
  "name": "@serverless-ts-npm-workspaces/<package-name>",
  "scripts": {
    "build": "tsc --build src/"
  },
  "dependencies": {
      "@serverless-ts-npm-workspaces/logger": "^1.0.0"
      ...other dependencies and internal packages
  },
  "devDependencies": {
      // Leave empty unless necessary, dev depenedencies can simply live in the root package.json and not repeated by each workspace. Only prodocution dependencies are required for consumers of published packages
  }
  ...
}
```

## Ts Config

### project root

`tsconfig-base.json`

```
{
    ...,
    "compilerOptions": {
        "paths": {
            "@serverless-ts-npm-workspaces/<package-name>/*": ["packages/<package-name>/src/*"],
            ...other internal packages
        }
```

### src

`packages/<package-name>/src/tsconfig.json`

```
{
    "extends": "../../../tsconfig-base.json",
    "compilerOptions": {
        "outDir": "../build",
    },
    "references": [
        {
            "path": "../../logger/src",
        }
        ...other internal packages this package depends on
    ]
}
```

### tests 

`packages/<package-name>/tests/tsconfig.json`

```
{
    "extends": "../../../tsconfig-base.json",
    "references": [
        {
            "path": "../src" // this will all handle other references for tests
        }
    ]
}
```

## Jest

```
module.exports = {
    ...,
    moduleNameMapper: {
        '^@serverless-ts-npm-workspaces/<package-name>/(.*)$': '<rootDir>/packages/<package-name>/src/$1',
        ...other internal packages
    }
```
