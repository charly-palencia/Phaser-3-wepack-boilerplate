"use strict";

module.exports = {
  entry: "./src/game.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: [ /\.vert$/, /\.frag$/ ],
        use: "raw-loader"
      }
    ],
  },
};
