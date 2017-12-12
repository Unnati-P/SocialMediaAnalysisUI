const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'app': __dirname + '/src/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ]
      }, {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: [/\.scss$/, /\.css$/],
        use: [
          'isomorphic-style-loader',
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              parser: 'postcss-scss'
            }
          }
        ]
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new BabelMinifyPlugin()
  ],
  resolve: {
    modules: [
      path.join(process.cwd(), 'src'),
      'node_modules'
    ],
    extensions: ['.js', '.json']
  },
  devtool: false
};
