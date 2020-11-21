console.log("This File Is Compiled");
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/auth/*",
    createProxyMiddleware({
      target: "http://localhost:4000", // backend Route
      // changeOrigin: true,
    })
  );
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "http://localhost:4000", // backend Route
      // changeOrigin: true,
    })
  );
};
