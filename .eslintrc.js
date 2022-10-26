// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
  },
  env: {
    es6: true,
    commonjs: true,
    browser: true,
  },
  extends: ['airbnb-typescript','prettier/react','prettier/@typescript-eslint','plugin:prettier/recommended'],
  plugins: ['prettier', '@typescript-eslint', 'react', 'babel', 'promise', 'import'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'scripts/webpack.base.conf.js',
      },
    },
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect',
    },
  },
  // add your custom rules here
  rules: {
    'object-curly-newline': 0,
    'class-methods-use-this': 0,
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    'max-len': [
      1,
      {
        code: 100,
        ignoreComments: true,
        ignorePattern: '^(\\s*[a-zA-Z_]+: \'[^\']+\'[,;]*)|(.*interpolate.*)|(.*require.*)|(.*_\\.template.*)|(<svg .*)|(<rect .*)|(<polygon .*)$',
        ignoreRegExpLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        tabWidth: 2,
      },
    ],
    // 'dot-notation': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-mixed-operators': 0,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0,
    'react/forbid-prop-types': 0,
    'react/prefer-stateless-function': 1,
    'react/require-default-props': 0,
    'react/no-find-dom-node': 0,
    'react/no-did-mount-set-state': 0,
    'react/static-property-placement': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    // rules are broken and provide falsy mistakes
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/anchor-is-valid': 'off',

    camelcase: 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
  },
  globals: {
    t: true,
    globals: true,
  },
};
