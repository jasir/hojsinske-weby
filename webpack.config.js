const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const formatter = require('eslint/lib/formatters/stylish');
const isDev = process.env.NODE_ENV === 'development';

const copyImages = [
    {
        from: path.resolve(__dirname, 'assets/src//images'),
        to: 'images',
    },
];

module.exports = {
    entry: {
        default: './assets/src/default.js',
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, './assets/dist/'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: isDev ? 'source-map' : '',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                },
                    {
                        loader: 'eslint-loader',
                        options: {
                            formatter,
                            fix: true
                        }
                    }
                ]
            },
            {
                test: /\.pcss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    }, {
                        loader: 'postcss-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            context: path.resolve(__dirname, 'assets/src/images'),
                            name: '[path][name].[ext]',
                            limit: 8192,
                            outputPath: 'images',
                            // publicPath: '../images'
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new CopyWebpackPlugin([...copyImages]),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            host: 'localhost',
            port: 3000,
            files: ['./*.html', '!./assets/dist/*/**.map'],
            server: {baseDir: ['./']},
        }),
    ],
};