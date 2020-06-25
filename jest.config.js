module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx)$': require.resolve('react-native/jest/preprocessor.js'),
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,js}', '!**/node_modules/**'],
  coverageReporters: ['text', 'text-summary'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$',
  testPathIgnorePatterns: ['/node_modules/'],
  // transformIgnorePatterns: [
  // 'node_modules/(?!(react-native|react-native-charts-wrapper|react-native-vector-icons|react-navigation-tabs|react-native-splash-screen|react-native-screens|react-native-reanimated|@react-native-firebase/app|@react-native-firebase/database|@react-native-firebase)/)',
  // ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
