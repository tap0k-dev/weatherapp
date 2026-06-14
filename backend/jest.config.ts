import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  verbose: true,
  forceExit: true,
  extensionsToTreatAsEsm: ['.ts'],
  clearMocks: true,
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^#(.*)\\.js$': '<rootDir>/src/$1',
  },
};

export default config;
