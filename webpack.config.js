'use strict'

const
  Webpack = require('webpack'),
  environment = process.env.NODE_ENV || 'development'

let plugins = [
  new Webpack.optimize.CommonsChunkPlugin({
    names: ['vendors'],
    minChunks: Infinity
  })
]
if (environment === 'development') {
  const WebpackNotifier = require('webpack-notifier')
  plugins.push(new WebpackNotifier({title: 'Webpack', alwaysNotify: true}))
}

module.exports = {
  devtool: 'source-map',
  context: `${__dirname}/client`,
  entry: {
    bundle: './components/Index.js',
    vendors: [
      'lodash'
    ]
  },
  output: {
    path: `${__dirname}/client/public/js`,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|api-docs)/,
        loaders: [
          'react-hot',
          'babel?presets[]=stage-0,presets[]=react,presets[]=es2015'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style', 'css'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: plugins,
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
}
