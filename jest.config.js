module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/text-encoder.mock.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
    testEnvironment: "jest-environment-jsdom"
};

/*const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: [
    '<rootDir>/path/to/text-encoder.mock.ts',
  ],
};

module.exports = createJestConfig(customJestConfig)*/