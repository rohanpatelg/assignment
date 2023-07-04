// eslint-disable-next-line no-undef
module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
  };
  