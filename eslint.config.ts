import cspell from '@cspell/eslint-plugin/configs';
import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import fileProgress from 'eslint-plugin-file-progress';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unicorn from 'eslint-plugin-unicorn';
import path from 'node:path';
import tseslint from 'typescript-eslint';

const gitIgnorePath = path.resolve(import.meta.dirname, '.gitignore');

const config: ReturnType<typeof tseslint.config> = tseslint.config(
  // start global
  includeIgnoreFile(gitIgnorePath),
  {
    name: 'manual ignores',
    ignores: ['.prettierrc.js', '.prettierrc.d.ts', 'demo', 'site/tailwind.config.js']
  },
  // end global

  // start eslint (js)
  eslint.configs.recommended,
  // end eslint (js)

  // start typescript-eslint
  ...tseslint.configs.strictTypeChecked,
  {
    name: 'typescript-eslint overrides',
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        project: ['tsconfig.json', 'site/tsconfig.json', 'package/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  // end typescript-eslint

  // start unicorn
  unicorn.configs.recommended,
  {
    name: 'unicorn overrides',
    rules: {
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/switch-case-braces': 'off'
    }
  },

  {
    name: 'unicorn overrides for site',
    files: ['site/**'],
    rules: {
      'unicorn/filename-case': 'off'
    }
  },
  // end unicorn

  // react-hooks
  reactHooks.configs['recommended-latest'],
  {
    name: 'react-hooks overrides',
    files: ['site/**']
  },
  // end react-hooks

  // react-refresh
  reactRefresh.configs.recommended,
  {
    name: 'react-refresh overrides',
    files: ['site/**'],
    rules: {
      'react-refresh/only-export-components': 'off'
    }
  },
  //  react-refresh

  // start vitest
  vitest.configs.recommended,
  // end vitest

  // start prettier
  prettierRecommended,
  // end

  // start cspell
  cspell.recommended,
  // end cspell

  // start file-progress
  fileProgress.configs.recommended
  // end file-progress

  // start tailwind
  // TODO: Add eslint-plugin-tailwindcss configuration once version 4 is released
  // end tailwind
);

export default config;
