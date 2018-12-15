const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
     entry: './src/js/app.js',
     mode: 'development',

     output: {
          filename: 'bundle.js',
          path: resolve(__dirname, "dist")
     },

     module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            },
            {
                 test: /\.scss$/,
                 use: [{
                  loader: "style-loader"
              }, {
                  loader: "css-loader", options: {
                      sourceMap: true
                  }
              }, {
                  loader: "sass-loader", options: {
                      sourceMap: true
                  }
              }]
              },
               {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                      {
                        loader: 'url-loader',
                        options: {
                          // limit: 25600 // 25Kb
                        }
                      }
                    ]
               },
               {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it use publicPath in webpackOptions.output
                      publicPath: '../'
                    }
                  }
                ]
              }

          ]
        },
        plugins: [
          new HtmlWebpackPlugin({  
               title: 'Furry Game',
               filename: 'index.html',
               template: './index.html'
          }),
          new MiniCssExtractPlugin({
           filename: "main.css"
          })
        ]
}