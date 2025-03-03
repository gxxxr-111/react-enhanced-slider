import path from 'path';
import $ from 'jquery';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.ts',  // Input file
    output: [
        {
            file: 'dist/index.cjs.js',  // Output as CommonJS format
            format: 'cjs',
            sourcemap: true,  // Enable source map
        },
        {
            file: 'dist/index.esm.js',  // Output as ES module format
            format: 'esm',
            sourcemap: true,  // Enable source map
        },
        {
            file: 'dist/index.umd.js',  // Output as UMD format
            format: 'umd',
            name: 'Slider',  // Global variable name exposed in UMD format
            sourcemap: true,
            plugins: [terser()],  // Minify the UMD output
            globals: {
                jquery: '$',  // Map jQuery to the global variable '$'
                react: 'React',        // Map React to the global variable 'React'
                'react-dom': 'ReactDOM', // Map ReactDOM to the global variable 'ReactDOM'
            },
        },
    ],
    plugins: [
        peerDepsExternal(),  // Automatically externalize peer dependencies
        resolve(),  // Resolve modules in node_modules
        commonjs(),  // Convert CommonJS modules to ES6
        typescript({ tsconfig: './tsconfig.json' }),  // Compile TypeScript using tsconfig.json
    ],
    external: [
        'react',  // Exclude React as a peer dependency
        'react-dom', // Exclude ReactDOM as a peer dependency
        'jquery',  // Exclude jQuery as a peer dependency
    ],
};
