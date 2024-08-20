const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  watch: true,
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        "./node_modules/swagger-ui-dist/swagger-ui.css",
        "./node_modules/swagger-ui-dist/swagger-ui-bundle.js",
        "./node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js",
        "./node_modules/swagger-ui-dist/favicon-16x16.png",
        "./node_modules/swagger-ui-dist/favicon-32x32.png",
      ],
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
