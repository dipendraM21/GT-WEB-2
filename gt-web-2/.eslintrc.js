module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'prettier',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'require-jsdoc': 'off',
    '@next/next/no-page-custom-font': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': 'off', // TODO: Remove this when linting errors are fixed
    '@typescript-eslint/ban-types': 'off', // TODO: Remove this when linting errors are fixed
  },
  settings: {
    'import/resolver': {
      alias: [['@/*', './src/*']],
    },
    react: {
      version: 'detect',
    },
  },
  globals: {
    React: 'writable',
  },
  ignorePatterns: ['**/*.css', '**/*.scss'],
}
