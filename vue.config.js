const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://81.71.165.39:3000',
        // target: 'http://120.24.182.3:3000',
        // target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
})
