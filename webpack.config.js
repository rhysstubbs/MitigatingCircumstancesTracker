const webpack = require('webpack');
const path = require('path');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const WebpackChunkHashPlugin = require('webpack-chunk-hash');

const assetPath = '../';
const production = (process.env.NODE_ENV === 'production' || process.argv.includes('-p'));

module.exports = {
    mode: production ? 'production' : 'development',
    context: path.resolve(__dirname),
    entry: {
        '/js/app': [
            path.resolve(__dirname, 'resources/assets/js/app.js'),
            path.resolve(__dirname, 'resources/assets/sass/app.scss')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: '[name].js?[chunkhash]',
        chunkFilename: '[name].js?[chunkhash]',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: [],
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                exclude: [path.resolve(__dirname, 'resources/assets/sass/app.scss')],
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                exclude: [],
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(s[ac]ss|less)$/,
                enforce: 'pre',
                loaders: ['import-glob-loader']
            },
            {
                test: /\.html$/,
                loaders: ['html-loader']
            },
            {
                test: /(\.(png|jpe?g|gif)$|^((?!font|sprite).)*\.svg$)/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: path => {
                                if (!/node_modules|bower_components/.test(path)) {
                                    return 'images/[name].[ext]?[hash]';
                                }

                                return 'images/vendor/' + path
                                    .replace(/\\/g, '/')
                                    .replace(
                                        /((.*(node_modules|bower_components))|images|image|img|assets)\//g, ''
                                    ) + '?[hash]';
                            },
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: true,
                            gifsicle: {},
                            mozjpeg: {},
                            optipng: {},
                            svgo: {}
                        }
                    }
                ]
            },
            {
                test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
                loader: 'file-loader',
                options: {
                    name: path => {
                        if (!/node_modules|bower_components/.test(path)) {
                            return 'fonts/[name].[ext]?[hash]';
                        }

                        return 'fonts/vendor/' + path
                            .replace(/\\/g, '/')
                            .replace(
                                /((.*(node_modules|bower_components))|fonts|font|assets)\//g, ''
                            ) + '?[hash]';
                    },
                    publicPath: assetPath
                }
            },
            {
                test: /\.(cur|ani)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    publicPath: assetPath
                }
            },
            {
                test: path.resolve(__dirname, 'resources/assets/sass/app.scss'),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            sourceMap: false,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true,
                            root: path.resolve(__dirname, 'node_modules')
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            precision: 8,
                            outputStyle: 'expanded',
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                include: /node_modules\/get-value/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/react'
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "/css/app.css?[chunkhash]",
            chunkFilename: "/css/[id].css?[chunkhash]"
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {},
            shouldClearConsole: true
        }),
        new webpack[production ? 'HashedModuleIdsPlugin': 'NamedModulesPlugin'](),
        new WebpackChunkHashPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: production
        }),
        new ManifestPlugin({
            fileName: 'mix-manifest.json',
            map: function(asset) {
                if (!!asset.name && asset.name.indexOf('?') > -1) {
                    asset.name = asset.name.substr(0, asset.name.indexOf('?'));
                }
                return asset;
            },
            filter: function(asset) {
                return /sprite\.svg/.test(asset.name) || (asset.isInitial && !/\.map$/.test(asset.name));
            }
        }),
        new WebpackBuildNotifierPlugin({
            title: "MitigatingCircumstancesTracker",
            successIcon:  path.resolve(__dirname, 'resources/assets/images/build-icons/success.png'),
            warningIcon: path.resolve(__dirname, 'resources/assets/images/build-icons/warning.png'),
            failureIcon: path.resolve(__dirname, 'resources/assets/images/build-icons/failure.png')
        })
    ],
    optimization: {
        minimize: production,
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    ie8: false,
                    ecma: 6,
                    compress: {
                        warnings: false,
                        drop_console: true
                    },
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "/js/vendor",
                    chunks: "all"
                },
                styles: {
                    name: '/css/app',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: [ '*', '.js', '.jsx' ],
        alias: {
            "./icons": path.resolve('./resources/assets/images/build-icons'),
            "MCT": path.resolve('./resources/assets/js'),
            "matches-selector/matches-selector": "desandro-matches-selector",
            "eventEmitter/EventEmitter": "wolfy87-eventemitter",
            "get-style-property/get-style-property": "desandro-get-style-property"
        },
        modules: [
            path.resolve('./node_modules')
        ]
    },
    devtool: production ? 'source-map' : 'eval',
    node: {
        fs: 'empty'
    },
    performance: {
        hints: false
    },
    stats: {
        hash: false,
        version: false,
        timings: false,
        children: false,
        errorDetails: false,
        chunks: false,
        modules: false,
        reasons: false,
        source: false,
        publicPath: false
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        compress: true,
        port: 9000,
    }
};