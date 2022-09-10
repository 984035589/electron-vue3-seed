import { BrowserWindow, app } from 'electron'
import { CONTROL_DISC } from '@/common/constant/browserWindowKey'

import path from 'path'
import { performance } from 'perf_hooks'
import { performanceTimeline } from '@/common/performance'
import { MarkName, getMarkStartName, getMarkEndName } from '@/common/performance/mark'

export default (windows: Record<string, BrowserWindow | null>) => {
    if (windows[CONTROL_DISC]) {
        windows[CONTROL_DISC]?.show()
        return
    }
    windows[CONTROL_DISC] = new BrowserWindow({
        width: 960,
        height: 540,
        // 窗口透明，窗口的形状就由dom判断了
        transparent: false,
        // 自定义边框标题
        frame: false,
        // 窗口大小不可调整
        // resizable: false,
        // 防止双击窗口可拖拽区触发最大化事件
        maximizable: false,
        alwaysOnTop: false,
        movable: true,
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.main.js')
        }
    })
    windows[CONTROL_DISC].on('ready-to-show', () => {
        performance.mark(getMarkEndName(MarkName.BROWSER_WINDOW))
        performanceTimeline(MarkName.BROWSER_WINDOW)
    })

    if (app.isPackaged) {
        windows[CONTROL_DISC]?.loadFile(path.join(__dirname, '../render/index.html'))
    } else {
        performance.mark(getMarkStartName(MarkName.BROWSER_WINDOW))
        windows[CONTROL_DISC]?.webContents.openDevTools()
        windows[CONTROL_DISC]?.loadURL(`https://localhost:${process.env.PORT}/index.html`)
    }
}
