import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';

export default {
    input: 'example/index.js',
    output: {
        file: 'example/bundle.js',
        format: 'iife'
    },
    plugins: [
        resolve({jsnext: true}),
        typescript(),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: [
                ["env", {modules: false}]
            ]
        })
    ]
};