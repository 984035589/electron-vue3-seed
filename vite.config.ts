/*
 * @Author: liujian
 * @Description:
 * @Date: 2021-10-26 09:38:01
 * @LastEditTime: 2022-08-29 17:22:53
 * @FilePath: /electron-vue3-vite/vite.config.ts
 */
import { defineConfig } from 'vite'
import path from 'path'
import pkg from './package.json'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [vue(), vueJsx()],
    root: path.join(__dirname, 'src/render/pages'),
    base: './',
    server: {
        port: pkg.env.PORT,
        https: true,
        proxy: {
            '/screen': {
                target: 'url',
                changeOrigin: true,
                ws: true,
                cookieDomainRewrite: {
                    '*': 'localhost'
                }
            }
        }
    },
    resolve: {
        alias: {
            '@root': __dirname,
            '@': path.join(__dirname, 'src')
        }
    },
    build: {
        outDir: path.join(__dirname, 'dist/render'),
        sourcemap: true,
        minify: false,
        rollupOptions: {
            input: {
                main: path.join(__dirname, 'src/render/pages/index.html'),
            }
        }
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment'
    }
})
