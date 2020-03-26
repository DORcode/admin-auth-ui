const path = require('path')
const sourceMap = process.env.NODE_ENV === 'development'
let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:9002'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://localhost:8081'
} else {
  baseUrl = 'http://localhost:9002'
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: 'dist',
  lintOnSave: false, // process.env.NODE_ENV !== 'production',
  devServer: {
    hot: true,
    overlay: {
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9002',
        ws: true, // websocket 支持
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
