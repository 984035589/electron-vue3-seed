/*
 * @Author: liujian
 * @Description:
 * @Date: 2021-10-26 09:38:01
 * @LastEditTime: 2022-08-29 16:51:37
 * @FilePath: /electron-vue3-vite/src/common/ipc/render.ts
 */
import { IpcRendererEvent, desktopCapturer, ipcRenderer } from 'electron'

import eventEmitter from '../eventEmitter'
// import fs from 'fs'
import { ipcMain } from 'electron'
// import store from '../store'

export const bridge = {
    // fs,
    ipcRenderer,
    ipcMain,
    listeners: {
        on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
            return ipcRenderer.on(channel, listener)
        },
        off(eventName: string | symbol, listener: (...args: any[]) => void) {
            return ipcRenderer.off(eventName, listener)
        },
        removeListener(channel: string, listener: (...args: any[]) => void) {
            return ipcRenderer.removeListener(channel, listener)
        },
        removeAllListeners(channel: string) {
            return ipcRenderer.removeAllListeners(channel)
        }
    },
    electronStore: {
        get(key: string) {
            // return store.get(key)
        },
        set(key: string, value: any) {
            // store.set(key, value)
        }
    },
    // 只在单个渲染进程中使用，若想通知其他其他渲染进程或主进程，请使用Ipc
    eventEmitter: {
        on(eventName: string | symbol, listener: (...args: any[]) => void) {
            return eventEmitter.on(eventName, listener)
        },
        emit(eventName: string | symbol, ...args: any[]) {
            return eventEmitter.emit(eventName, args)
        },
        listen: (eventName: string | symbol, listener: (args: any) => void) => {
            return eventEmitter.listen(eventName, listener)
        },
        removeAllListeners(eventName: string) {
            return eventEmitter.removeAllListeners(eventName)
        },
        listeners(eventName: string | symbol) {
            return eventEmitter.listeners(eventName)
        },
        listen1: eventEmitter.listen
    },
    desktopCapturer,
    getDisplaySources
}

/**
 * 获取窗口、桌面
 * @param types window screen
 * @returns
 */
async function getDisplaySources(types: string[]) {
    const sources = await desktopCapturer.getSources({ types })
    return sources.map((e) => ({ name: e.name, id: e.id, image: e.thumbnail.toDataURL() }))
}
