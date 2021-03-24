const path = require('path');

module.exports = {
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'build/js'),
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader","css-loader"] },
      {
        test: /\.(png|svg|jpe?g|gif|woff2?|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          outputPath: '../img',
        },
      },
  ],
  }
};
