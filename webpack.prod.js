const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

const buildPath = path.resolve(__dirname, 'docs');

module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: '[name].[hash:20].js',
        path: buildPath
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
            },
            {
              test: /\.(scss|css|sass)$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader
                },
                {
                  loader: 'css-loader',
                  options: { sourceMap: true }
                },
                {
                  loader: 'postcss-loader',
                  options: { sourceMap: true }
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap: true }
                }
              ]
            },
            {
              test: /\.(png|jpg|gif)$/,
              use: [
                  {
                    loader: 'url-loader',
                    options: {
                      name: '[name].[hash:20].[ext]',
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
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/html/home.html',
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            filename: './buy.html',
            template: './src/html/buy.html',
            inject: 'body',
        }),
        new HtmlWebpackInlineSVGPlugin({
            runPreEmit: true,
        }),
        new CleanWebpackPlugin(buildPath),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                map: {
                    inline: false,
                },
                discardComments: {
                    removeAll: true
                },
                discardUnused: false
            },
            canPrint: true
        })
    ]
};
