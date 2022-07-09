module.exports = {
    extends: ['plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint/eslint-plugin', 'react-hooks'],
    rules: {
        'no-restricted-syntax': 'off',
        'no-plusplus': 'off',
        'no-console': 'off',
        'no-underscore-dangle': 'off',
        'consistent-return': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        'consistent-return': 'off',
        'import/no-useless-path-segments': 'off',
        'no-unused-expressions': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-await-in-loop': 'off',
        'no-constant-condition': ['warn', { checkLoops: false }],
        'react/display-name': 0,
        'react/jsx-props-no-spreading': 0,
        'react/state-in-constructor': 0,
        'react/static-property-placement': 0,
        indent: ['warn', 4]
    },
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module'
    }
};
