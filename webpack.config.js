const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

     entry: './src/js/app.js',

     mode: 'production',

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
               use: [
                   "style-loader", // creates style nodes from JS strings
                   "css-loader", // translates CSS into CommonJS
                   "sass-loader" // compiles Sass to CSS, using Node Sass by default
               ]},
               {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                      {
                        loader: 'url-loader',
                        options: {
                          limit: 16384 // 16Kb
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
          })
        ]
}