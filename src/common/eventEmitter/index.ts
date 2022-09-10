/*
 * @Author: liujian liujian14@zuoyebang.com
 * @Date: 2022-08-26 17:01:39
 * @LastEditors: liujian liujian14@zuoyebang.com
 * @LastEditTime: 2022-08-29 16:21:13
 * @FilePath: /electron-vue3-vite/src/common/eventEmitter/index.ts
 * @Description: 
 */
import { EventEmitter } from 'events'

export class EventEmitterWrap extends EventEmitter {
    /**
     * 重写on方法
     */
    listen(eventName: string | symbol, listener: (args: any) => void) {
        this.on(eventName, (data) => {
            listener(data[0])
        })
        return this
    }
}

const eventEmitter = new EventEmitterWrap()

eventEmitter.setMaxListeners(10000)

export default eventEmitter
