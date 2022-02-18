/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globals: {
    "ts-jest":
      {
        tsconfig: "tsconfig-base.json"
      }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: { // https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping
    '^@/handlers/(.*)$': '<rootDir>/packages/handlers/src/$1',
    '^@/logger/(.*)$': '<rootDir>/packages/logger/src/$1'
  }
}