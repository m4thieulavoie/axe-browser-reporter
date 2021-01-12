const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = (env) => ({
  entry:
    env.NODE_ENV === "development" ? "./src/index.dev.ts" : "./src/index.ts",
  mode: env.NODE_ENV,
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "validPage.html",
      template: "src/validPage.html",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env.NODE_ENV),
        APP_ENV: JSON.stringify("browser"),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: ["sass-to-string", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
  },
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: "index.html",
    },
  },
});
