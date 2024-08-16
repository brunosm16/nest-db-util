import type { Config } from '@jest/types';
import { commonJestConfig } from './jest.config';

export const unitConfig: Config.InitialOptions = {
  ...commonJestConfig,
  displayName: 'Unit Tests',
  testMatch: ['**/*.spec.ts'],
};
