import { ChildProcess, spawn } from 'child_process'
import { OutputOptions, rollup, watch } from 'rollup'
import { env, main } from '../package.json'

import chalk from 'chalk'
import electron from 'electron'
import minimist from 'minimist'
import options from './rollup.config'
import ora from 'ora'
import path from 'path'
import { waitOn } from './utils'

const argv = minimist(process.argv.slice(2))
const opt = options({ proc: 'main', env: argv.env })
const TAG = '[build-main.ts]'
const spinner = ora(`${TAG} Electron main build...`)

;(async () => {
    if (argv.watch) {
        // Wait on vite server launched
        const waitOnState = waitOn({ port: env.PORT })

        const watcher = watch(opt)
        let child: ChildProcess
        watcher.on('change', (filename) => {
            const log = chalk.green(`change -- ${filename}`)
            console.log(TAG, log)
        })
        watcher.on('event', async (ev) => {
            await waitOnState

            if (ev.code === 'END') {
                if (child) child.kill()
                child = spawn(electron as unknown as string, [path.join(__dirname, `../${main}`)], {
                    env: Object.assign(process.env, env),
                    stdio: 'inherit'
                })
            } else if (ev.code === 'ERROR') {
                console.log(ev.error)
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
