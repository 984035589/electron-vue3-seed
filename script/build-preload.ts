/*
 * @Author: liujian
 * @Description:
 * @Date: 2021-10-26 09:38:01
 * @LastEditTime: 2022-08-29 17:26:28
 * @FilePath: /electron-vue3-vite/script/build-preload.ts
 */
import { OutputOptions, rollup, watch } from 'rollup'
import { createWsServer, formatWsSendData } from './ws'

import WebSocket from 'ws'
import chalk from 'chalk'
import minimist from 'minimist'
import options from './rollup.config'
import ora from 'ora'
import path from 'path'

const argv = minimist(process.argv.slice(2))
const opt = options({
    proc: 'preload',
    env: argv.env,
    input: {
        'index.main': path.join(__dirname, `../src/preload/index.main.ts`),
    }
})
const TAG = '[build-preload.ts]'
const spinner = ora(`${TAG} Electron preload build...`)

;(async () => {
    if (argv.watch) {
        const watcher = watch(opt)
        const wssObj = createWsServer({ TAG })

        watcher.on('change', (filename) => {
            const log = chalk.yellow(`change -- ${filename}`)
            console.log(TAG, log)

            // Hot reload renderer process !!!
            if (wssObj.instance?.readyState === WebSocket.OPEN) {
                console.log(TAG, 'Hot reload renderer process')
                wssObj.instance.send(formatWsSendData({ cmd: 'reload', data: Date.now() }))
            }
        })
    } else {
        spinner.start()
        try {
            const build = await rollup(opt)
            await build.write(opt.output as OutputOptions)
            spinner.succeed()
            process.exit()
        } catch (error) {
            console.log(`\n${TAG} ${chalk.red('构建报错')}\n`, error, '\n')
            spinner.fail()
            process.exit(1)
        }
    }
})()
