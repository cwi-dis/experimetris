const webpack = require("webpack");

const rendererTarget = {
  entry: "./app/main.ts",
  mode: "development",
  target: "web",
  output: {
    path: __dirname + "/bundle",
    filename: "renderer.js"
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

const mainProcessTarget = {
  entry: "./main.ts",
  mode: "development",
  target: "electron-main",
  output: {
    path: __dirname + "/bundle",
    filename: "main.js"
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
      }
    ]
  },
  node: {
    __dirname: false
  }
};

module.exports = [ rendererTarget, mainProcessTarget ];
