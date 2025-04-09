import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  }),
  {
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages. `react` related packages come first.
            ['^react', '^@?\\w'],
            // Internal packages.
            ['^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
];

export default eslintConfig;
