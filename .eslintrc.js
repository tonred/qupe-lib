module.exports = {
    env: {
        browser: true,
        commonjs: true,
    },

    extends: [
        './node_modules/@broxus/eslint-config/lib/rules/best-practices',
        './node_modules/@broxus/eslint-config/lib/rules/errors',
        './node_modules/@broxus/eslint-config/lib/rules/node',
        './node_modules/@broxus/eslint-config/lib/rules/style',
        './node_modules/@broxus/eslint-config/lib/rules/variables',
        './node_modules/@broxus/eslint-config/lib/rules/es6',
        './node_modules/@broxus/eslint-config/lib/rules/strict',
        './node_modules/@broxus/eslint-config/lib/rules/imports',
        // '@broxus/rules/react',
        // '@broxus/rules/react-a11y',
    ].map(require.resolve),

    overrides: [
        {
            extends: ['./node_modules/@broxus/eslint-config/lib/rules/typescript'],
            files: ['*.ts', '*.tsx'],
        },
        {
            files: ['*.d.ts', '**/*/types.ts'],
            rules: {
                camelcase: 'off',
                'max-len': 'off',
            },
        },
        {
            files: ['*.abi.ts'],
            rules: {
                camelcase: 'off',
                'max-len': 'off',
                'sort-keys': 'off',
            },
        },
    ],

    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },


    root: true,

    rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'class-methods-use-this': 'off',
        'import/extensions': ['error', 'never', { json: 'always' }],
        'import/no-cycle': 'off',
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off', // todo
    },

    settings: {
        'import/extensions': ['.ts', '.js'],
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
        },
    },
}
