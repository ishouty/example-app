const baseConfig = require('../../eslint.base.config.js');
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const { fixupConfigRules } = require('@eslint/compat');
const nx = require('@nx/eslint-plugin');
const config = require('../../eslint.config.js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...baseConfig,
  ...fixupConfigRules(compat.extends('next')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ...config,
  ...nx.configs['flat/react-typescript'],
  {
    ignores: ['.next/**/*'],
  },
];
