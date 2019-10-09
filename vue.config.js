/*
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-22 20:50:47
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-09 12:54:05
 */
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  // 配置路径 调用时需要加~
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('imgs', resolve('src/assets/images'))
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
};
