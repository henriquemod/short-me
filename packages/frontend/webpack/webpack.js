const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const ENVS = {
    ENDPOINT: process.env.ENDPOINT || 'http://localhost:3000',
    BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT || 'http://localhost:8080',
    APP_ENV: process.env.APP_ENV || 'development'
}

module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [
            path.resolve(__dirname, '../../../node_modules'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                include: [path.resolve(__dirname, '..', './src')]
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '..', './build'),
        filename: 'bundle.js'
    },
    mode: 'development',
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        }),
        new webpack.EnvironmentPlugin(ENVS)
    ],
    devServer: {
        static: 'build',
        historyApiFallback: true,
        liveReload: true,
        port: 3000,
        open: false
    }
}
