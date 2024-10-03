export default {
  displayName: 'app-ui',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/app-ui',
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 30,
      lines: 50,
      statements: 50,
    },
  },
};
