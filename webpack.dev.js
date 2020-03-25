const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: './src/index.js',
    output: {
      path: __dirname
    },
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, "dist")
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['@babel/preset-env']
                  ]
                }
            }
            ,
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            }
            ,
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
            ,
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]?hash=[hash:20]',
                            limit: 8192
                        }
                    }
                ]
            }
            ,
            {
                // Load all icons
                test: /\.(eot|woff|woff2|svg|ttf|webmanifest)([\?]?.*)$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/html/home.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            filename: './buy.html',
            template: './src/html/buy.html',
            inject: 'body',
        }),
        new HtmlWebpackInlineSVGPlugin({
            runPreEmit: true,
        })
    ]
};
