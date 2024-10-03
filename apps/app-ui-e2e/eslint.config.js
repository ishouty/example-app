const baseConfig = require('../../eslint.base.config.js');
const playwright = require('eslint-plugin-playwright');
const config = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  playwright.configs['flat/recommended'],
  ...config,
  {
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    rules: {},
  },
];
