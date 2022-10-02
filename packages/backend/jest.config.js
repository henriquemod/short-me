/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src/__tests__'],
  coverageProvider: 'babel',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coveragePathIgnorePatterns: ['index.ts', 'log-repository.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
  // moduleDirectories: ['node_modules', 'src']
}
