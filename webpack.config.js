const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'telegramClient.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

