const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 模式: 生产环境
  mode: 'production',
  // 入口
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  // 出口(打包生成js)
  output: {
    filename: 'static/js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 模块加载器
  module: {
    rules: [
      //配置
      {
        test: /\.js$/,//用于匹配文件,对哪些文件进行处理
        //exclude: /(node_modules|bower_components)/,
        include: [path.resolve(__dirname, 'src')],//只针对哪些处理
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],//预设包:包含多个常用插件包的一个大包
          }
        }
      },
      //处理css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
      },
      //处理图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
        }
      },
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    })
  ],
  devServer:{
    open:true,
    quiet:true,
  },
  devtool:'cheap-module-eval-source-map',
}