/*
 * @Author: liujian
 * @Description:
 * @Date: 2021-11-22 09:16:42
 * @LastEditTime: 2022-08-29 17:18:16
 * @FilePath: /electron-vue3-vite/src/render/service/index.ts
 */
import axios, { AxiosResponse } from 'axios'

import { ElMessage } from 'element-plus'

const store = window.bridge.electronStore

axios.defaults.timeout = 100000

axios.interceptors.response.use(
    function (response: AxiosResponse<any>) {
        if (response && response.status === 200) {
            if (response.data.code !== 0) {
                ElMessage({
                    type: 'error',
                    center: true,
                    message: response.data.msg,
                    duration: 3000
                })
            }
            return Promise.resolve(response.data)
        }
        return response
    },
    function (error: Error) {
        throw error
    }
)
