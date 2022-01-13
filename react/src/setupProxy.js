const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/yoshinari/api',
    createProxyMiddleware({
      target: 'http://sab:5000',
      // changeOrigin: true,
      pathRewrite: { '^.*/api': '' }
    })
  );
};