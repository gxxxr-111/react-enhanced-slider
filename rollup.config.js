// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import externals from 'rollup-plugin-node-externals';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        externals({
            deps: true,
            devDeps: false,
            peerDeps: true,
        }),

        resolve(),

        commonjs(),

        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist/types',
            rootDir: 'src',
            exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
        }),

        postcss({
            extensions: ['.css'],
            extract: 'dist/styles.css',
            minimize: true,
            inject: {
                insertInto: 'head',
            },
        }),

        process.env.NODE_ENV === 'production' && terser(),
    ],

};
