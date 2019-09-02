const webpack = require("webpack");

module.exports = {
  entry: "./app/main.ts",
  mode: "development",
  target: "web",
  output: {
    path: __dirname + "/js",
    filename: "bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }, {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  }
};
