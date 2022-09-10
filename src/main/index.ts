/*
 * @Author: liujian
 * @Description:
 * @Date: 2021-10-26 09:38:01
 * @LastEditTime: 2022-08-29 16:29:20
 * @FilePath: /electron-vue3-vite/src/main/index.ts
 */
import 'v8-compile-cache'
import { BrowserWindow, app } from 'electron'
import controlDisc from './browserWindow/controlDisc'
import path from 'path'
import os from 'os'
import performance from '../common/performance'

performance()

app.commandLine.appendSwitch('--ignore-certificate-errors', 'true')
app.commandLine.appendSwitch('wm-window-animations-disabled')

const windows: Record<string, BrowserWindow | null> = {}

app.whenReady().then(async () => {
    // const mainProfiler = await startProfiler('main', 5222)
    controlDisc(windows)
    // mainProfiler.stop()
})

async function startProfiler(name: string, port: number) {
    const profiler = require('v8-inspect-profiler')
    // 监测对应端口
    const profiling = await profiler.startProfiling({ port })
    // 返回 stop 方法，以便停止监测
    return {
        async stop() {
            const profile = await profiling.stop()
            const prefix = path.join(os.homedir(), 'prof-test')
            // 输出性能文件
            profiler.writeProfile(profile, `${prefix}.${name}.cpuprofile`)
        }
    }
}

app.on('window-all-closed', () => {
    // 清空渲染进程
    Object.keys(windows).forEach((key) => {
        windows[key] = null
    })
    app.quit()
})
