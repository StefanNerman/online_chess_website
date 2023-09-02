const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:43289';

const context =  [
  "/api/signup",
  "/api/login",
  "/api/sessions",
  "/api/sessions/delete",
  "/api/profiles",
  "/api/user_game_data",
  "/api/rating",
  "/api/websocket",
  "/api/change_password",
  "/api/account_delete"
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    },
    ws: true
  });

  app.use(appProxy);
};
