#!/user/bin/env ts-node

import { promisify } from 'util'
import { exec } from 'child_process'
import { promises } from 'fs'
import { join } from 'path'

const execP = promisify(exec)
const rootDir = join(__dirname, '../') 

const createPackageJson = async (packageName: string) => {
    const path = join(rootDir, 'packages', packageName, 'package.json')
    console.log(`creating ${path}...`)

    const packageJson = `{
    "name": "${packageName}",
    "version": "1.0.0",
    "description": "${packageName}",
    "scripts": {
        "build-ts": "tsc --build src/"
    },
    "dependencies": {},
    "devDependencies": {},
    "repository": {
        "type": "git",
        "url": "git+https://github.com/nimaeskandary/serverless-ts-npm-workspaces.git"
    },
    "author": "",
    "license": "ISC",
    "bugs": {
        "url": "https://github.com/nimaeskandary/serverless-ts-npm-workspaces/issues"
    },
    "homepage": "https://github.com/nimaeskandary/serverless-ts-npm-workspaces#readme"
}`
    await promises.writeFile(path, packageJson)
}


const createSrcTsConfig = async (packageName: string) => {
    const path = join(rootDir, 'packages', packageName, 'src', 'tsconfig.json')
    console.log(`creating ${path}...`)

    const tsConfig = `{
    "extends": "../../../tsconfig-base.json",
    "compilerOptions": {
        "outDir": "../build",
    },
    "references": []
}`
    await promises.writeFile(path, tsConfig)
}

const createTestTsConfig = async (packageName: string) => {
    const path = join(rootDir, 'packages', packageName, 'tests', 'tsconfig.json')
    console.log(`creating ${path}...`)

    const tsConfig = `{
    "extends": "../../../tsconfig-base.json",
    "references": [
        {
            "path": "../src"
        }
    ]
}`
    await promises.writeFile(path, tsConfig)
}

const updateJestConfig = async (packageName: string) => {
    const path = join(rootDir, 'jest.config.json')
    console.log(`updating ${path}...`)

    const jestConfig = await promises.readFile(path).then(b => JSON.parse(b.toString()))

    const key = `^@/${packageName}/(.*)$`
    const value =  `<rootDir>/packages/${packageName}/src/$1`

    const moduleNameMapper = jestConfig.moduleNameMapper || {}
    moduleNameMapper[key] = value
    jestConfig.moduleNameMapper = moduleNameMapper

    await promises.writeFile(path, JSON.stringify(jestConfig, undefined, 2))
}

const updateTsConfigBase = async (packageName: string) => {
    const path = join(rootDir, 'tsconfig-base.json')
    console.log(`updating ${path}...`)

    const tsConfigBase = await promises.readFile(path).then(b => JSON.parse(b.toString()))

    const key = `@/${packageName}/*`
    const value =  [`packages/${packageName}/src/*`]

    const paths = tsConfigBase.compilerOptions.paths || {}
    paths[key] = value
    tsConfigBase.compilerOptions.paths = paths

    await promises.writeFile(path, JSON.stringify(tsConfigBase, undefined, 2))
}

const updateRootPackageJson = async (packageName: string) => {
    const path = join(rootDir, 'package.json')
    console.log(`updating ${path}...`)

    const packageJson = await promises.readFile(path).then(b => JSON.parse(b.toString()))

    const value =  `packages/${packageName}`

    const workspaces = packageJson.workspaces || []
    workspaces.push(value)

    await promises.writeFile(path, JSON.stringify(packageJson, undefined, 2))
}

const init = async (packageName: string) => execP(`cd ${rootDir} &&
    mkdir ./packages/${packageName} &&
    mkdir ./packages/${packageName}/src &&
    mkdir ./packages/${packageName}/tests`)

const main = async () => {
    if (process.argv.length < 3) {
        console.error("error: missing package name")
        process.exit(1)
    }
    
    const packageName = process.argv[2]
    await init(packageName)
    await createPackageJson(packageName)
    await createSrcTsConfig(packageName)
    await createTestTsConfig(packageName)
    await updateRootPackageJson(packageName)
    await updateJestConfig(packageName)
    await updateTsConfigBase(packageName)
}

main()
