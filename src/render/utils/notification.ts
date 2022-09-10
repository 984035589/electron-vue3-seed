/*
 * @Author: liujian
 * @Description: 
 * @Date: 2021-11-22 09:18:51
 * @LastEditTime: 2021-11-22 09:18:51
 * @FilePath: /electron-fe/src/render/utils/notification.ts
 */
import { ElNotification } from 'element-plus'

export default function (
    type: 'success' | 'warning' | 'info' | 'error' | '',
    message: string,
    title: string = '提示',
    duration: number = 3000
) {
    message &&
        ElNotification({
            type,
            message,
            title,
            duration
        })
}
