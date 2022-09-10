/*
 * @Author: liujian
 * @Description: 驼峰转下划线
 * @Date: 2021-12-07 20:11:53
 * @LastEditTime: 2021-12-07 20:39:20
 * @FilePath: /electron-fe/src/common/utils/humpToLine.ts
 */

export const toLine = (hump: any) => hump.replace(/([A-Z]|\d)/g, (a: any, l: any) => `_${l.toLowerCase()}`)

export const objectToLine = (obj: any) => {
    const newObj: any = {}
    for (let k in obj) {
        const temp = obj[k]
        if (typeof temp === 'object') {
            newObj[toLine(k)] = objectToLine(temp)
        } else {
            newObj[toLine(k)] = temp
        }
    }
    return newObj
}
