/*
 * @Author: liujian
 * @Description:
 * @Date: 2021-11-17 14:35:26
 * @LastEditTime: 2021-11-17 14:35:26
 * @FilePath: /electron-vue-vite-element-plus/typings/vue-router.d.ts
 */

declare module 'vue-router' {
    interface RouteMeta extends Record<string, unknown> {
        // 展示名称
        label?: string
        // 是否是导航路由
        isMenuTab?: boolean
        // 是否是需要展示banner的页面
        isShowBanner?: boolean
        // 是否使用面包屑导航
        isShowBreadCrumb?: boolean
    }
}

export {}
