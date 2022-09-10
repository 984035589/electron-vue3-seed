import { RollupOptions } from 'rollup'
import alias from '@rollup/plugin-alias'
import { builtins } from './utils'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from 'path'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export interface ConfigOptions extends RollupOptions {
    env?: typeof process.env.NODE_ENV
    proc: 'main' | 'render' | 'preload'
}

export default function (opts: ConfigOptions) {
    const sourcemap = opts.proc === 'render'
    const options: RollupOptions = {
        input: opts.input ?? path.join(__dirname, `../src/${opts.proc}/index.ts`),
        output: {
            dir: path.join(__dirname, `../dist/${opts.proc}`),
            format: 'cjs',
            sourcemap,
            chunkFileNames: '[name].js',
            ...opts.output
        },
        plugins: [
            nodeResolve({
                extensions: ['.ts', '.js', 'json']
            }),
            terser(),
            commonjs(),
            json(),
            typescript({
                sourceMap: sourcemap,
                noEmitOnError: true
            }),
            alias({
                entries: {
                    '@root': path.join(__dirname, '..'),
                    '@': path.join(__dirname, '../src')
                }
            }),
            replace({
                ...Object.entries({ NODE_ENV: opts.env }).reduce(
                    (acc, [k, v]) => Object.assign(acc, { [`process.env.${k}`]: JSON.stringify(v) }),
                    {}
                ),
                preventAssignment: true
            })
        ],
        external: [...builtins(), 'electron'],
        onwarn: (warning) => {
            // https://github.com/rollup/rollup/issues/1089#issuecomment-365395213
            if (warning.code !== 'CIRCULAR_DEPENDENCY') {
                console.error(`(!) ${warning.message}`)
            }
        }
    }

    return options
}
