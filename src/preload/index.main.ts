/*
 * @Author: liujian
 * @Description: 
 * @Date: 2021-10-26 09:38:01
 * @LastEditTime: 2021-11-29 17:09:26
 * @FilePath: /electron-fe/src/preload/index.main.ts
 */
import { app, contextBridge } from 'electron'
import { domReady, injectWsCode } from './utils'

import { bridge } from '../common/ipc/render'
import { useLoading } from './loading'

const isDev = process.env.NODE_ENV === 'development'
const { removeLoading, appendLoading } = useLoading()

domReady().then(() => {
    appendLoading()
    isDev &&
        injectWsCode({
            host: '127.0.0.1',
            port: process.env.PORT_WS as string
        })
})

contextBridge.exposeInMainWorld('bridge', {
    ...bridge,
    removeLoading
})
