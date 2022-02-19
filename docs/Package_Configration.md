# Package Configuration

Some configration is used to make use of npm workspaces, typescript composite projects, and jest work

## Table of Contents

* [Creation](#creation)
* [File Structure](#file-structure)
* [Ts Config](#ts-config)
    * [project root](#project-root)
    * [src](#src)
    * [tests](#tests)
* [Jest](#jest)
* [Webpack](#webpack)

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

## Ts Config

### project root

`tsconfig-base.json`

```
{
    ...,
    "compilerOptions": {
        "paths": {
            ... other interal dependencies,
            "@/<package-name>/*": ["packages/<package-name>/src/*"]
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
            "path": "../src" // this should handle other references for tests
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
        '^@/<package-name>/(.*)$': '<rootDir>/packages/<package-name>/src/$1'
    }
```

## Webpack

* currently `webpack.config.js` is used when running serverless to build the handlers and bundle dependencies
    * this sorts out the dependency mess of using npm workspaces, typescript references, typescript path mapping
* **TODO** similar webpack configurations can be created to build packages that need to published to an npm registry
