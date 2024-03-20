module.exports = {
    resolve: {
        modules: ['node_modules', 'path/to/kakao-maps/library'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    }
};