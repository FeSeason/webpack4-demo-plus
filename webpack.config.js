const path = require('path')
const webpack = require('webpack')
const HtmlWbpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'assets/js/[name].][hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextWebpackPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }],
          fallback: 'style-loader'
        })
      }
    ]
  },
  devServer: {
    port: 8088,
    overlay: {
      error: true
    },
    proxy: {
      "/api": {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    hot: false,// 如果开启 devServer hot HMR会失效
    clientLogLevel: "none", // cancel console client log
    open: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWbpackPlugin({
      title: 'webpack 4',
      favicon: '',
      template: 'src/index.html'
    }),
    new ExtractTextWebpackPlugin({
      filename: 'assets/css/main.[hash:8].css'
    }),
  ]
}

module.exports = config
