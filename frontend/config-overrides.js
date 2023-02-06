/* config-overrides.js */
const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    assert: require.resolve("assert"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    path: require.resolve("path-browserify"),
    zlib: require.resolve("browserify-zlib"),
    stream: require.resolve("stream-browserify"),
    url: require.resolve("url"),
    constants: require.resolve("constants-browserify"),
    "process/browser": require.resolve("process/browser"),
    net: require.resolve("net"),
    fs: false,
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
