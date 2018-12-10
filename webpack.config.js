const path = require('path');

module.exports = {
  entry: './src/home.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }
};