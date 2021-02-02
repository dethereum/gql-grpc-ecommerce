module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'simple-import-sort',
    "functional"
  ],
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "plugin:functional/external-recommended",
    "plugin:functional/no-exceptions",
    "plugin:functional/no-statements",
    'plugin:functional/no-mutations',
    "plugin:functional/stylitic",
    "plugin:rxjs/recommended",
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/consistent-type-imports': 2,
    // rxjs rules
    "rxjs/finnish": 2,
    // import rules
    "simple-import-sort/imports": [
      2,
      {
        // The default grouping, but with type imports first as a separate
        // group, sorting that group like non-type imports are grouped.
        groups: [
          ["^@?\\w.*\\u0000$", "^[^.].*\\u0000$", "^\\..*\\u0000$"],
          ["^\\u0000"],
          ["^@?\\w"],
          ["^"],
          ["^\\."],
        ],
      },
    ],
    "simple-import-sort/exports": 2,
    "sort-imports": 0,
  },
  overrides: [
    {
      files: ["*.spec.ts", "*.e2e-spec.ts"],
      env: {
        jest: true,
      },
      rules: {
        "functional/no-expression-statement": 0,
        "functional/no-let": 0,
      },
    },
  ],
};
