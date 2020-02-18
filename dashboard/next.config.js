const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  /* config options here */
  publicRuntimeConfig: {
    HOST: 'http://0.0.0.0:3000',
    API_URL: 'http://0.0.0.0:4000',
  },
})
