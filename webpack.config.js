module.exports = {
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    entry: './src/index.js',
    output: {
        path: __dirname + '/build',
        filename: 'app.build.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
};