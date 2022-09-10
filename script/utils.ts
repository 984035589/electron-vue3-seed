/*
 * @Author: liujian
 * @Description:
 * @Date: 2021-10-26 09:38:01
 * @LastEditTime: 2021-11-22 19:59:46
 * @FilePath: /electron-fe/script/utils.ts
 */
import { Plugin } from 'rollup'
import { builtinModules } from 'module'
import { get } from 'https'
import { green } from 'chalk'

/** 轮询监听 vite 启动 */
export function waitOn(arg0: { port: string | number; interval?: number }) {
    return new Promise<number | undefined>((resolve) => {
        const { port, interval = 149 } = arg0
        const url = `https://localhost:${port}`
        let counter = 0
        const timer: NodeJS.Timer = setInterval(() => {
            // get(url, (res) => {
            //     clearInterval(timer)
            //     console.log('[waitOn]', green(`"${url}" are already responsive.`), `(${res.statusCode}: ${res.statusMessage})`)
            //     resolve(res.statusCode)
            // }).on('error', (err) => {
            //     console.log('[waitOn]', `counter: ${counter++}`)
            // })
        }, interval)
        resolve(200)
    })
}

/** node.js builtins module */
export const builtins = () => builtinModules.filter((x) => !/^_|^(internal|v8|node-inspect)\/|\//.test(x))

/**
 * @todo
 * typescript with esbuild
 */
export function typescript(): Plugin {
    return {
        name: 'cxmh:rollup-typescript-esbuild'
    }
}
