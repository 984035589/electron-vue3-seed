/*
 * @Author: liujian
 * @Description:
 * @Date: 2021-10-26 09:38:01
 * @LastEditTime: 2022-01-05 14:07:17
 * @FilePath: /electron-fe/typings/global.d.ts
 */

import ElectronStore from 'electron-store'
import { EventEmitter } from 'events'
import { EventEmitterWrap } from '@/common/eventEmitter/index'

export {}

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production'
    }
}

declare global {
    interface Window {
        /** 过桥通讯 */
        bridge: ExposeBridge
        MediaRecorder: any
    }
    interface Fn<T = any, R = T> {
        (...arg: T[]): R
    }
}
interface ExposeBridge {
    /** 关闭预加载动画 */
    removeLoading: () => void

    /** Electron.IpcRenderer  */
    ipcRenderer: Electron.IpcRenderer

    /** ipcRenderer的on */
    listeners: {
        on: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => Electron.IpcRenderer
        off: (eventName: string | symbol, listener: (...args: any[]) => void) => any
        removeListener: (channel: string, listener: (...args: any[]) => void) => Electron.IpcRenderer
        removeAllListeners: (channel: string) => Electron.IpcRenderer
    }

    /** electron store */
    electronStore: {
        get: (key: string) => any
        set: (key: string, value: any) => void
    }

    eventEmitter: {
        on(eventName: string | symbol, listener: (...args: any[]) => void): EventEmitterWrap
        emit(eventName: string | symbol, ...args: any[]): boolean
        listen(eventName: string | symbol, listener: (any) => void): EventEmitterWrap
        removeAllListeners(eventName: any[]): EventEmitterWrap
        listeners(eventName: string | symbol): EventEmitterWrap
    }

    desktopCapturer: Electron.DesktopCapturer
    b1: Buffer
    getDisplaySources: (types: string[]) => { name; id; image }[]
}

declare
