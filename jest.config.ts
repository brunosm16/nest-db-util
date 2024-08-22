import e2eConfig from './jest.e2e.config';
import unitConfig from './jest.unit.config';

import type { Config } from '@jest/types';

const jestCoveragePaths = [
  '<rootDir>/packages/**/*.ts',
  '!<rootDir>/packages/**/tsup.config.ts',
  '!**/dist/**',
  '!**/node_modules/**',
];

export const commonJestConfig: Config.InitialOptions = {
  clearMocks: true,
  collectCoverageFrom: jestCoveragePaths,
  moduleNameMapper: {
    '^@nest-db-util/(.*)$': '<rootDir>/packages/$1/src',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-extended'],
  testEnvironment: 'node',
};

const config: Config.InitialOptions = {
  ...commonJestConfig,
  coverageDirectory: 'coverage',
  projects: [e2eConfig, unitConfig],
};

export default config;
