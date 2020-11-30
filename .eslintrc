module.exports = {
    root: true,
    env: { jest: true, node: true, es6: true},
    extends: [
        'standard',
    ],
    rules: {
        semi: 'off',
        'indent': ["error", 2],
        'handle-callback-err': 1,
        'prefer-promise-reject-errors': 0,
        'import/no-duplicates': ['error'],
        'arrow-parens': 0,
        'prefer-arrow-callback': 1,
        'generator-star-spacing': 0,
        'no-restricted-imports': [2, { paths: ['lodash-es'] }],
        'no-console': 0,
        'no-unused-vars': 1,
        'no-throw-literal': 0
    },
    overrides: [
        {
            files: ['core/**/*.ts'],
            rules: {
                'no-undef': 1
            }
        }
    ]
};
