/*
 * @Author: liujian
 * @Description:
 * @Date: 2021-11-20 23:07:11
 * @LastEditTime: 2022-08-29 17:29:01
 * @FilePath: /electron-vue3-vite/src/render/pages/controlDisk/main.ts
 */
import 'element-plus/dist/index.css'

import * as ElementPlusIcons from '@element-plus/icons'

import { App, createApp } from 'vue'

import AppComp from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'

function ElementPlusIconsRegister(app: App) {
    for (const [name, icon] of Object.entries(ElementPlusIcons)) {
        app.component(name, icon)
    }
}

createApp(AppComp)
    .use(router)
    .use(ElementPlus)
    .use(ElementPlusIconsRegister)
    .mount('#app')
    .$nextTick(() => {
        window.bridge.removeLoading()
    })
