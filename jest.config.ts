import e2eConfig from './jest.e2e.config';
import unitConfig from './jest.unit.config';

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
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
  projects: [e2eConfig, unitConfig],
};

export default config;
