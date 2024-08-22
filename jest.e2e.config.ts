import { Config } from '@jest/types';

const e2eConfig: Config.InitialOptions = {
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
  displayName: 'E2E Tests',
  testMatch: ['**/e2e/**/*.spec.ts'],
};

export default e2eConfig;
