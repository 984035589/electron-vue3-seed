/*
 * @Author: liujian
 * @Description: Expose something function to renderer
 * @Date: 2021-10-26 09:38:01
 * @LastEditTime: 2022-08-29 16:22:20
 * @FilePath: /electron-vue3-vite/src/common/ipc/main.ts
 */

import { BrowserWindow, ipcMain } from 'electron'
import { TOGGLE_DEVTOOLS } from '../constant/event'

import { IpcHandleListener } from '../types'

export const register = {
    toggleDevtools(win: BrowserWindow) {
        ipcMain.handle(TOGGLE_DEVTOOLS, () => {
            win.webContents.toggleDevTools()
        })
        return register
    },
    changeWindowSize(listener: IpcHandleListener) {
        ipcMain.handle('changeWindowSize', listener)
        return register
    }
}
