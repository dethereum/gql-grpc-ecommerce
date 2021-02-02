module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'simple-import-sort',
    "functional",
    "total-functions"
  ],
  extends: [
    'eslint:recommended',
    "plugin:functional/external-recommended",
    "plugin:functional/no-exceptions",
    "plugin:functional/no-statements",
    'plugin:functional/no-mutations',
    "plugin:functional/stylitic",
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:total-functions/recommended',
    "plugin:rxjs/recommended",
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
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
    // functional style rules
    "functional/no-mixed-type": 2,
    "no-eval": 2,
    "no-implied-eval": 2,
    "no-await-in-loop": 2,
    "no-new-wrappers": 2,
    eqeqeq: 2,
    "no-caller": 2,
    "require-unicode-regexp": 2,
    "no-loss-of-precision": 2,
    "@typescript-eslint/consistent-type-assertions": [
      2,
      {
        assertionStyle: "never",
      },
    ],
    "@typescript-eslint/strict-boolean-expressions": [
      2,
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
      },
    ],
    "@typescript-eslint/consistent-type-definitions": [2, "type"],
    "total-functions/no-unsafe-type-assertion": 2,
    "@typescript-eslint/no-base-to-string": 2,
    "@typescript-eslint/prefer-reduce-type-parameter": 2,
    "@typescript-eslint/no-unnecessary-condition": 2,
    "@typescript-eslint/switch-exhaustiveness-check": 2,
    /**
     * Make eslint-plugin-functional rules more aggressive.
     */
    "functional/prefer-readonly-type": [
      2,
      {
        checkImplicit: true,
      },
    ],
  },
  overrides: [
    {
      files: ["*.spec.ts", "*.e2e-spec.ts"],
      env: {
        jest: true,
      },
      rules: {
        "functional/no-expression-statement": 0,
        "functional/no-let": 0
      },
    },
  ],
};
