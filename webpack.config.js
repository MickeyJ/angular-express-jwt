const webpack = require('webpack');
const AnnotatePlugin = require('ng-annotate-webpack-plugin');

const DEV = process.env.NODE_ENV==='development';
const PROD = process.env.NODE_ENV==='production';

const config = {
  entry: ['./src'],
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },
  devtool: !PROD ? 'source-map' : null,
  devServer: {
    contentBase: 'public',
    historyApiFallback: {
      index: '/index.html'
    }
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        loader: 'style!css!sass!',
        exclude: /node_modules/
      },
      {
        test: /\.css?$/, 
        loader: "style!css!"
      },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};

if(!DEV){
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new AnnotatePlugin({
      add: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle: false,
      compressor: {
        drop_console: true,
        warnings: true
      }
    })
  )
} else {
  config.entry.push('webpack/hot/dev-server');
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = config;