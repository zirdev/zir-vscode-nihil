module.exports = {
  root: true, // make to not take in any user specified rules in parent folders
  env: {
    browser: true,
    es6: true,
    serviceworker: true,
    worker: true,
    node: true,
    commonjs: false,
    jquery: false,
  },
  // parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
  },
  // parser: "babel-eslint",
  plugins: [
    'import',
    'standard',
    'vue',
    'prettier',
    //"html"
  ],
  extends: [
    // "plugin:vue/recommended",
    // "eslint:recommended",
    // "plugin:prettier/essential",
    // "plugin:prettier/vue"
    'eslint:recommended',
    'plugin:vue/recommended',
    'prettier',
    'plugin:prettier/recommended',
    '@vue/prettier',
    'prettier/vue',
  ],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['warn', 2, { SwitchCase: 1 }],
    quotes: ['warn', 'double'],
    semi: ['off', 'always'],
    'no-var': ['off'],
    'no-console': ['off'],
    'no-unused-vars': ['off'],
    'no-useless-escape': ['off'],
    'no-mixed-spaces-and-tabs': ['warn'],
    'key-spacing': [
      2,
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
        },
        multiLine: {
          beforeColon: false,
          afterColon: true,
          // "align": "value" //["value", "colon"]
        },
      },
    ],
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-indent': 'off',
    'prettier/prettier': [
      'warn',
      {
        printWidth: 110,
        useTabs: false,
        singleQuote: false,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        arrowParens: 'always',
      },
    ],
  },
  globals: {
    // $nuxt: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 9,
    sourceType: 'module',
  },
};
