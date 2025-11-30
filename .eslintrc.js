module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'google',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        'linebreak-style': 'off',
        'max-len': ['error', {
            code: 160,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'indent': ['error', 4],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'semi': ['error', 'always'],
    },
};
