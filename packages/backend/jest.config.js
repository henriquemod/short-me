/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/tests'],
  coverageProvider: 'babel',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coveragePathIgnorePatterns: ['index.ts'],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
  // moduleDirectories: ['node_modules', 'src']
}
