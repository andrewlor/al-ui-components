const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/react"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [ "style-loader", "css-loader", "sass-loader" ]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".scss"] },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: 'al-ui-components',
    libraryTarget: 'umd',
  },
  watch: true
};
