const path = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: 'development',

    output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "[name].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(sass|less|css)$/,
                use: ["style-loader", "css-loader", 'sass-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
    },
};