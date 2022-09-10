/*
 * @Author: liujian
 * @Description:
 * @Date: 2021-10-26 09:38:01
 * @LastEditTime: 2022-08-29 17:33:55
 * @FilePath: /electron-vue3-vite/src/render/pages/controlDisk/router/index.ts
 */
import { RouteMeta, RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { RouterName, RouterPath } from './constant'

import { defineComponent } from 'vue'

export type Component<T extends keyof any = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)

declare type Recordable<T = any> = Record<string, T>

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    path: string
    component: Component | string
    meta?: RouteMeta
    components?: Component
    props?: Recordable
    fullPath?: string
}

const routes: Array<RouteRecordRaw> = [
    {
        path: RouterPath.ROOT,
        redirect: RouterPath.ROOT + RouterPath.DOWNLOAD
    },
    {
        path: RouterPath.ROOT + RouterPath.DOWNLOAD,
        name: RouterName.DOWNLOAD,
        component: () => import('../views/Download.vue'),
        meta: {
            label: '下载',
            showBack: false
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

export default router
