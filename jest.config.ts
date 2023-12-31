/* eslint-disable @typescript-eslint/naming-convention */
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleNameMapper: {
    '@constants/(.*)': '<rootDir>/src/constants/$1',
    '@functions/(.*)': '<rootDir>/src/functions/$1',
    '@interfaces/(.*)': '<rootDir>/src/interfaces/$1',
    '@configuration/(.*)': '<rootDir>/src/configuration/$1',
    '@maps/(.*)': '<rootDir>/src/maps/$1',
  },
};
export default config;
