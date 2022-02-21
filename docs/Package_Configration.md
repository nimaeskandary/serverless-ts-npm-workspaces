# Package Configuration

Some configration is used to make use of npm workspaces, typescript composite projects, and jest work

## Table of Contents

* [Creation](#creation)
* [File Structure](#file-structure)
* [Package.json](#packagejson)
* [Ts Config](#ts-config)
    * [project root](#project-root)
    * [src](#src)
    * [tests](#tests)
* [Jest](#jest)

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
      "@serverless-ts-npm-workspaces/logger": "@serverless-ts-npm-workspaces/logger" // for internal dependencies list in this format
      ...other dependencies
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
            ...other dependencies,
            "@serverless-ts-npm-workspaces/<package-name>/*": ["packages/<package-name>/src/*"]
        }
```

> Note: do not use typescript paths for imports from the same package, as it will break imports for consumers of published packages, i.e. `import foo from '../foo'` if it is from the same package

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
        ...other internal dependencies
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
        other internal dependencies,
        '^@serverless-ts-npm-workspaces/<package-name>/(.*)$': '<rootDir>/packages/<package-name>/src/$1'
    }
```
