const merge = require("webpack-merge");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "../build"),
    publicPath: "/build/",
    filename: "project.bundle.js"
  },
  devServer: {
    contentBase: "./",
    writeToDisk: true,
  },
  plugins: [
    new CleanWebpackPlugin(["build"], {
      root: path.resolve(__dirname, "..")
    }),
  ]
});
