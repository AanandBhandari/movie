// const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');
module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new Dotenv(),
    // new webpack.DefinePlugin({
    //   "process.env.API_BASE_URL": JSON.stringify("http://localhost:5002/api"),
    // }),
  ],
};
