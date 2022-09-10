/*
 * @Author: liujian
 * @Description:
 * @Date: 2021-10-26 09:38:01
 * @LastEditTime: 2021-11-19 14:36:11
 * @FilePath: /electron-fe/script/build-render.ts
 */

import { Plugin, RollupOptions } from 'rollup'

import { join } from 'path'

function rollupOpts(env: typeof process.env.NODE_ENV): RollupOptions {
    return {
        input: join(__dirname, '../src/render/main.ts'),
        output: {
            dir: join(__dirname, '../dist/render')
        },
        plugins: [],
        external: ['electron']
    }
}

// ------------------- plugins -------------------
function html(): Plugin {
    return {
        name: 'cxmh:rollup/plugin-html'
    }
}

function style(): Plugin {
    return {
        name: 'cxmh:rollup/plugin-style'
    }
}

function file(): Plugin {
    return {
        name: 'cxmh:rollup/plugin-file'
    }
}

function electron(): Plugin {
    return {
        name: 'cxmh:rollup/plugin-electron'
    }
}
