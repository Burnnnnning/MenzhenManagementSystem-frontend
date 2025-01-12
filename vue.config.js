const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // 本地运行时，将请求代理到后端服务器
        target: 'http://localhost:5000',
        // 生产环境时，将请求代理到后端服务器
        // target: 'https://ai.d0w0b.club:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})