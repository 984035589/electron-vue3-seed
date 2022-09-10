/*
 * @Author: liujian
 * @Description: 把秒格式化成时:分:秒
 * @Date: 2021-12-15 20:19:19
 * @LastEditTime: 2022-08-29 16:24:11
 * @FilePath: /electron-vue3-vite/src/common/utils/formatTimer.ts
 */
export default (value: number) => {
    const floor = Math.floor
    const h = floor(value / 3600) < 10 ? '0' + floor(value / 3600) : floor(value / 3600)
    const m = floor((value / 60) % 60) < 10 ? '0' + floor((value / 60) % 60) : floor((value / 60) % 60)
    const s = floor(value % 60) < 10 ? '0' + floor(value % 60) : floor(value % 60)
    let res = ''
    res += `${h}:`
    res += `${m}:`
    res += `${s}`
    return res
}
