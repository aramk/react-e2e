module.exports = {
  automock: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  moduleFileExtensions: [
    'js',
    'json',
  ],
  testRegex: '\\/jest\\/[^/]*\\.test\\.js$',
};
