var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'target/js')
    },
  resolve: {
      alias: {
          infusion: "infusion/dist/infusion-uio.min"
      }
  }
};
