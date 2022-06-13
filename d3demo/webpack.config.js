const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    devtool:'inline-source-map',
    mode: "development",
    // node:'empty',
    // target:'web',
    node: {
        fs: 'empty',
        net:'empty',
        tls:'empty',
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 模板的名称
            filename: 'index.html',
            // 模板地址
            template: path.resolve(__dirname,'src/public','index.html'),
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        // clean:true,
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src/public'),
        watchContentBase: true,
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            
              loader: 'babel-loader',
          }
        ]
      }
}
