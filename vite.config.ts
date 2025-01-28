/*
 * @Author: June
 * @Description:
 * @Date: 2025-01-28 11:28:47
 * @LastEditors: June
 * @LastEditTime: 2025-01-28 14:13:26
 * @FilePath: /uniapp-template/vite.config.ts
 */
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'

export default ({ mode }) => {
  const env = loadEnv(mode, resolve(process.cwd(), 'env'))
  const { VITE_APP_PORT, VITE_DELETE_CONSOLE } = env

  return defineConfig({
    envDir: './env',
    plugins: [
      UniManifest(),
      UniPages({
        exclude: ['**/components/**/**.*'],
        routeBlockLang: 'json5', // 虽然设了默认值，但是vue文件还是要加上 lang="json5", 这样才能很好地格式化
        // homePage 通过 vue 文件的 route-block 的type="home"来设定
        // pages 目录为 src/pages，分包目录不能配置在pages目录下
        // subPackages: ['src/pages-sub'], // 是个数组，可以配置多个，但是不能为pages里面的目录
        dts: 'src/types/uni-pages.d.ts'
      }),
      uni(),
      Unocss(),
      AutoImport({
        imports: ['vue', 'uni-app'],
        dts: './src/dts/auto-imports.d.ts',
        eslintrc: {
          enabled: true
        }
      })
    ],
    resolve: {
      alias: {
        '@': `${resolve(__dirname)}/`
      }
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10)
    },
    build: {
      // uno报错处理
      watch: {
        exclude: ['node_modules/**', '/__uno.css']
      },
      minify: mode === 'development' ? false : 'terser',
      terserOptions: {
        compress: {
          drop_console: VITE_DELETE_CONSOLE === 'true',
          drop_debugger: true
        }
      }
    }
  })
}
