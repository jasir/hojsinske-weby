const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = (env = {}) => {
    const configs = [
        // Konfigurace pro hojsin.cz
        createConfig('hojsin.cz'),
        // Konfigurace pro penzionsborovna.cz  
        createConfig('penzionsborovna.cz'),
    ];
    
    // Pokud je specifikován target, vrátíme jen ten config
    if (env.target) {
        return configs.find(config => config.name === env.target) || configs;
    }
    
    return configs;
};

function createConfig(siteName) {
    return {
        name: siteName,
        entry: `./assets/${siteName}/default.js`,
        output: {
            filename: 'script.js',
            path: path.resolve(__dirname, `www/assets/${siteName}/`),
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        devtool: isDev ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.pcss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: isDev,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                outputPath: 'images/',
                                context: `assets/${siteName}/images`,
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css',
            }),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, `assets/${siteName}/images`),
                    to: 'images',
                },
                {
                    from: path.resolve(__dirname, `assets/${siteName}/svg`),
                    to: 'svg',
                },
                {
                    from: path.resolve(__dirname, `assets/${siteName}/font`),
                    to: 'font',
                },
            ], { copyUnmodified: true }),
        ],
    };
}
