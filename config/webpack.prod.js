const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "project.bundle.js"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "..")
    }),
    new webpack.DefinePlugin({
      "CANVAS_RENDERER": JSON.stringify(true),
      "WEBGL_RENDERER": JSON.stringify(true),
    }),
    new CopyWebpackPlugin([
      { from: "assets", to: "assets" },
    ]),
    new HtmlWebpackPlugin({
      template: "index.template.html",
    }),
  ]
});
