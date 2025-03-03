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
            assetFileNames: 'styles/[name][extname]'
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
            assetFileNames: 'styles/[name][extname]'
        },
    ],
    plugins: [
        postcss({
            extract: 'dist/index.css',
            modules: false,
            minimize: process.env.NODE_ENV === 'production',
            inject: false,
            sourceMap: true,
            config: {
                path: './postcss.config.js'
            }
        }),

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

        process.env.NODE_ENV === 'production' && terser(),
    ],
};