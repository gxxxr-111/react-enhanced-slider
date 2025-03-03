// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import externals from 'rollup-plugin-node-externals';
import { terser } from 'rollup-plugin-terser';
import css from "rollup-plugin-import-css";
import "./styles/globals.css";

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
        // 自动处理外部依赖
        externals({
            deps: true,
            devDeps: false,
            peerDeps: true,
        }),

        // 解析node_modules中的模块
        resolve(),

        // 将CommonJS模块转换为ES6
        commonjs(),

        // 处理TypeScript
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist/types',
            rootDir: 'src',
            exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
        }),

        css(),

        // 生产环境压缩
        process.env.NODE_ENV === 'production' && terser(),
    ],

};