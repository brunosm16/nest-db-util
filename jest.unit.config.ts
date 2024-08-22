import type { Config } from '@jest/types';

const unitConfig: Config.InitialOptions = {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.ts',
    '!<rootDir>/packages/**/tsup.config.ts',
    '!**/dist/**',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    '^@nest-db-util/(.*)$': '<rootDir>/packages/$1/src',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-extended'],
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  displayName: 'Unit Tests',
  testMatch: ['**/*.spec.ts'],
};

export default unitConfig;
