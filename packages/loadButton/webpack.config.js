const path = require('path');
// const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) =>  {
  plugins = []

  if (env.analzy) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  console.log(env, argv)
  return {
    // JavaScript 执行入口文件
    entry: {
      index: './src/index.jsx',
      sec: './src/sec.js',
    },
    output: {
      // 把所有依赖的模块合并输出到一个 bundle.js 文件
      filename: '[name].js',
      // 输出文件都放到 dist 目录下
      path: path.resolve(__dirname, './dist'),
    },
    resolve: {
      extensions: ['jsx','.js',],
      modules: [path.resolve(__dirname, 'node_modules')]
    },
    devServer:{
      // 告诉 DevServer 要开启模块热替换模式
      hot: true,      
    } ,
    module: {
      rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/, 
            use: ['babel-loader'],
        },
        {
            test: /.less$/,
            exclude: /node_modules/, 
            use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        },
        {
            test: /.css$/,
            exclude: /node_modules/, 
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        },

      ]
    },
    watchOptions: {
      // 4-5使用自动刷新：不监听的 node_modules 目录下的文件
      ignored: /node_modules/,
      },
    // 输出 source-map 方便直接调试 ES6 源码
    // devtool: 'source-map'
    // 一定要设置mode， 否则bundle文件可能为空
    mode: argv.mode, //'production'// 'development', 
    plugins: [ 
      ...plugins,
    ], 
  }

};