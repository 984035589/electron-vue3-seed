/*
 * @Author: liujian liujian14@zuoyebang.com
 * @Date: 2022-08-26 17:01:39
 * @LastEditors: liujian liujian14@zuoyebang.com
 * @LastEditTime: 2022-08-29 17:22:29
 * @FilePath: /electron-vue3-vite/src/render/pages/controlDisk/store/modules/user.ts
 * @Description:
 */
import { defineStore } from 'pinia'
import { store } from '../index'

interface LocalState {}
export const userModule = defineStore({
    id: 'user',
    state: (): LocalState => ({}),
    actions: {},
    getters: {}
})

export function usemoduleTypeStoreWithOut() {
    return userModule(store)
}
