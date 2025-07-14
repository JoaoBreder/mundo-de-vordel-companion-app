import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
    {
        files: ['**/*.ts'],
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic, ...angular.configs.tsRecommended],
        plugins: {
            prettier: prettierPlugin,
        },
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/prefer-inject': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        plugins: {
            prettier: prettierPlugin,
        },
        rules: { 'prettier/prettier': ['error', { parser: 'angular' }] },
    },
    globalIgnores([
        '/dist',
        '/tmp',
        '/out-tsc',
        '/node_modules',
        'package-lock.json',
        'yarn.lock',
        '/.angular/cache',
        '/.firebase/**',
        '/.sass-cache',
        '/connect.lock',
        '/coverage',
        '/libpeerconnection.log',
        'npm-debug.log',
        'yarn-error.log',
        'testem.log',
        '/typings',
        '*.*.cache',
        'firebase-debug.log',
        '.DS_Store',
        'Thumbs.db',
    ]),
]);
