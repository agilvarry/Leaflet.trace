const path = require("path");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  mode: "development",
  entry: "./src/leaflet.trace.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "demo"),
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./demo",
  },  plugins: [
    new BundleAnalyzerPlugin()
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
