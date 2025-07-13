module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-bootstrap-4-grid'),
        require('postcss-nested'),
        require('postcss-preset-env')({
            stage: 3,
            features: {
                'nesting-rules': true,
                'custom-media-queries': true,
            }
        }),
        require('postcss-pxtorem')({
            rootValue: 16,
            propList: ['*'],
        }),
        ...(process.env.NODE_ENV === 'production' ? [require('cssnano')({
            preset: 'default',
        })] : []),
    ],
};
