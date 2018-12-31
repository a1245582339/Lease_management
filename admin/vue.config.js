module.exports = {
  baseUrl: './',
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api/v1': {
        target: 'http://dev9.dehuinet.com:8019',
        ws: true,
        changeOrigin: true,
        onProxyReq: (proxyReq) => {
          const headers = {
            'AUTHORIZATION': 'bearer HZbI2ZD3rk8lJXIVQsclDE09oQ5EbxzktOt275LeVODdM_qP',
            'NETWORK-ID': 3
          }
          Object.keys(headers).forEach(key => {
            proxyReq.setHeader(key, headers[key]);
          })
        }
      },
      '/api/v2': {
        target: 'http://dev9.dehuinet.com:8019',
        ws: true,
        changeOrigin: true,
        onProxyReq: (proxyReq) => {
          const headers = {
            'AUTHORIZATION': 'bearer HZbI2ZD3rk8lJXIVQsclDE09oQ5EbxzktOt275LeVODdM_qP',
            'NETWORK-ID': 3
          }
          Object.keys(headers).forEach(key => {
            proxyReq.setHeader(key, headers[key]);
          })
        }
      }
    }
  }
}
