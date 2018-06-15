var webpack = require('webpack');

module.exports = {
    entry: {
        'app': ['./assets/front-end/app/main.ts', './assets/front-end/headerApp/main.ts']
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'raw-loader' }]
            }
        ],
        exprContextCritical: false

    }
};