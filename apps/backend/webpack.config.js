const path = require("path");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./src/index.ts",
  mode: NODE_ENV,
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
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
