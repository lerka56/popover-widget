module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js'],
    transform: {
      '^.+\\.js$': 'babel-jest'
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    transformIgnorePatterns: [
      '/node_modules/(?!some-es6-module)/'
    ],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
  };