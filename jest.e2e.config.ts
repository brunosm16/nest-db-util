import { Config } from '@jest/types';
import { commonJestConfig } from './jest.config';

export const e2eConfig: Config.InitialOptions = {
  ...commonJestConfig,
  displayName: 'E2E Tests',
  testMatch: ['**/e2e/**/*.spec.ts'],
};
