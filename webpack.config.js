const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: {
    lib: "./src/components/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "elui-dyntable.min.js",
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: [".js", ".vue"],
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
