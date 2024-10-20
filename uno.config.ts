/*
 * @Author: June
 * @Description:
 * @Date: 2024-10-20 10:57:10
 * @LastEditors: June
 * @LastEditTime: 2024-10-20 11:03:49
 * @FilePath: /uniapp-template/uno.config.ts
 */
import presetWeapp from 'unocss-preset-weapp'
import { transformerDirectives } from 'unocss'
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
    transformerDirectives(),
    transformerCompileClass(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass()
  ]
}
