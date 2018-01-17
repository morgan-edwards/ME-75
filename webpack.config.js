var path = require('path');

module.exports = {
  context: __dirname,
  entry: './scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'scripts'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
