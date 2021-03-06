const path = require("path");

const extensions = [".tsx", ".ts", ".js", "json"];

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        include: path.resolve(__dirname, "src"),
        loader: "ts-loader?configFile=tsconfig.webpack.json"
      }
    ]
  },
  resolve: {
    extensions
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "textile",
    libraryTarget: "var"
  },
  devServer: {
    filename: "bundle.js",
    publicPath: "/dist/"
  }
};
