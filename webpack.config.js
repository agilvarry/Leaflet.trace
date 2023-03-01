const path = require("path");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const prod = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "production",
  entry: "./src/leaflet.trace.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
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
        use: [ prod ? "style-loader" : MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
      },
    ],
  },
};
