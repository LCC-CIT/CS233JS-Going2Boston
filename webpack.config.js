const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'going2boston.bundle.js',
    },
    module: {
        rules: [
            // ... other rules ...
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./index.html"
        }),
        new copyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./images"),
                    to: path.resolve(__dirname, "dist/images"),
                }
            ],
        })
    ]
};