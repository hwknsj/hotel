const webpack = require('webpack')
const { merge } = require('webpack-merge')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  plugins: [
    // new UglifyJSPlugin({
    //   sourceMap: true
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  mode: 'production'
})
