const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    '/yoshinari/api',
    createProxyMiddleware({
      target: 'http://sab:5000',
      // changeOrigin: true,
      pathRewrite: { '^/yoshinari/api': '' }
    })
  );
};