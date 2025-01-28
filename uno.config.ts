/*
 * @Author: June
 * @Description:
 * @Date: 2024-10-20 10:57:10
 * @LastEditors: June
 * @LastEditTime: 2025-01-28 13:42:16
 * @FilePath: /uniapp-template/uno.config.ts
 */
import presetWeapp from 'unocss-preset-weapp'
import { transformerDirectives, transformerVariantGroup } from 'unocss'
import {
  extractorAttributify,
  transformerClass
} from 'unocss-preset-weapp/transformer'
import transformerCompileClass from '@unocss/transformer-compile-class' // 将一组类编译为一个类

const { presetWeappAttributify, transformerAttributify } =
  extractorAttributify()

export default {
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    // attributify autocomplete
    presetWeappAttributify()
  ],
  shortcuts: [
    {
      'f-center': 'flex justify-center items-center',
      'wh-full': 'w-full h-full',
      'text-over-1': 'overflow-hidden text-ellipsis whitespace-nowrap'
    }
  ],

  transformers: [
    // 启用 @apply 功能
    transformerDirectives(),
    transformerCompileClass(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup()
  ]
}
