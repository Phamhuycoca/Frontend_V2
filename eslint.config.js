import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import sonarjs from 'eslint-plugin-sonarjs';
import promise from 'eslint-plugin-promise';
import node from 'eslint-plugin-node';
import unicorn from 'eslint-plugin-unicorn';
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      'unused-imports': unusedImports,
      'jsx-a11y': jsxA11y,
      sonarjs,
      promise,
      node,
      unicorn,
      perfectionist,
    },
    rules: {
      // ✅ format theo prettier
      'prettier/prettier': 'error',

      // 📦 Organize imports
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'import/no-unresolved': 'off',

      // 🧹 Clean up unused imports
      'unused-imports/no-unused-imports': 'error',

      // ♿ JSX accessibility
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',

      // 🧠 SonarJS
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/no-identical-functions': 'warn',

      // ⏳ Promise
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',

      // 📘 General TS rules
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '^_' }],

      'no-console': 'error',
      'no-alert': 'error',
      'no-magic-numbers': 'warn',
      'prefer-const': 'error',
      'node/prefer-global/process': 'off',
      'node/no-process-env': 'error',

      // 🧠 Sort imports
      'perfectionist/sort-imports': ['error', { type: 'natural', order: 'asc' }],

      // 📁 File naming
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            snakeCase: true,
            pascalCase: true,
          },
          ignore: ['README.md', 'vite-env.d.ts'],
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
