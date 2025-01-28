/*
 * @Author: June
 * @Description:
 * @Date: 2025-01-28 11:28:47
 * @LastEditors: June
 * @LastEditTime: 2025-01-28 13:58:19
 * @FilePath: /uniapp-template/vite.config.ts
 */
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'

export default ({ mode }) => {
  const env = loadEnv(mode, resolve(process.cwd(), 'env'))
  const { VITE_APP_PORT, VITE_DELETE_CONSOLE } = env

  return defineConfig({
    envDir: './env',
    plugins: [
      UniManifest,
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
