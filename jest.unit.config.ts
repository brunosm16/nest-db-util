import type { Config } from '@jest/types';
import { commonJestConfig } from './jest.config';

const unitConfig: Config.InitialOptions = {
  ...commonJestConfig,
  displayName: 'Unit Tests',
  testMatch: ['**/*.spec.ts'],
};

export default unitConfig;
