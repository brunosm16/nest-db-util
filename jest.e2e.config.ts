import { Config } from '@jest/types';
import { commonJestConfig } from './jest.config';

const e2eConfig: Config.InitialOptions = {
  ...commonJestConfig,
  displayName: 'E2E Tests',
  testMatch: ['**/e2e/**/*.spec.ts'],
};

export default e2eConfig;
