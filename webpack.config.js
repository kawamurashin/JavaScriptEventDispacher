module.exports = {
    //mode: 'production',
    mode: 'development',
    entry: './src/Main.js',
    output: {
        path: `${__dirname}/script`,
        filename: "webpack.js"
    },
    devtool : "source-map",
    watch : true
};