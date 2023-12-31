/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line filename-rules/match
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: false,
    commonjs: true,
    es6: true,
  },
  plugins: [
    '@typescript-eslint',
    'no-type-assertion',
    'import',
    'simple-import-sort',
    'prefer-arrow',
    'jest-formatting',
    'filename-rules',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-type-assertion/no-type-assertion': 'error',
    '@typescript-eslint/no-require-imports': ['warn'],
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'require-await': ['error'],
    'no-warning-comments': ['warn', { terms: ['todo'], location: 'anywhere' }],
    'no-trailing-spaces': ['error', { ignoreComments: true }],
    'eol-last': ['error', 'always'],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    '@typescript-eslint/ban-types': ['warn'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'class',
          'block',
          'block-like',
          'const',
          'return',
          'if',
          'case',
          'switch',
          'try',
          'throw',
          'expression',
          'while',
        ],
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    'filename-rules/match': ['error', 'camelcase'],
    'jest-formatting/padding-around-describe-blocks': 'error',
    'jest-formatting/padding-around-test-blocks': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*/*.ts'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              //node imports
              [
                '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
              ],
              //package imports
              [
                '^@apollo',
                '^@as-integrations',
                '^@commercetools',
                '^@middy',
                '^apollo',
                '^aws-sdk',
                '^axios',
                '^graphql',
                '^jsonwebtoken',
                '^nodejs-',
                '^redis',
                '^@qantas',
                '^lodash',
                'slugify',
                'ramda',
              ],
              //side effect imports
              ['^\\u0000'],
              //anything starting with a letter
              ['^\\w'],
              // Anything not matched in another group.
              ['^'],
              // Anything that starts with a dot.
              ['^\\.'],
            ],
          },
        ],
      },
    },
    {
      files: ['*.test.ts'],
      rules: {
        'prefer-arrow/prefer-arrow-functions': 0,
        'prefer-arrow-callback': 0,
        'func-style': 0,
        '@typescript-eslint/no-explicit-any': 'off',
        'no-type-assertion/no-type-assertion': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
