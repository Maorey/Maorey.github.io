// 模块
const webpack = require('webpack');
const path = require('path');
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const InlineChunkManifestHtmlWebpackPlugin = require('inline-manifest-webpack-plugin')
// 变量
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const allowedHosts = ['127.0.0.1']
const sourcePath = path.join(__dirname, './src')
const distPath = path.join(__dirname, './dist')
const htmlTemplate = './index.template.ejs'
// 网页标题、图标
const title = '啥时候起个名字吧'
const favicon = path.join(__dirname, './src/assetc/favicon.ico')
// 输出信息配置
const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: true,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m'
  }
}

module.exports = function (env) {
  const nodeEnv = process.env.NODE_ENV === 'production'
    ? process.env.NODE_ENV
    : 'development'
  const isProd = nodeEnv === 'production'

  const publicPath = isProd?'dist/':''
  const indexFilename = isProd?'../index.html':'index.html'
  // 共同插件
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.optimize.CommonsChunkPlugin({name: 'manifest', minChunks: Infinity}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    // create css bundle
    new ExtractTextPlugin({
      filename: isProd ? 'css/[name]-[contenthash].css' : 'css/[name].css',
      allChunks: true
    }),
    // create index.html
    // 插件配置文档 https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      title: title,
      filename:indexFilename,
      favicon: favicon,
      inject: true,
      production: isProd,
      minify: isProd && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new InlineManifestWebpackPlugin({ name: 'webpackManifest' }),
    new InlineChunkManifestHtmlWebpackPlugin()
  ]
  if (isProd) { // production
    plugins.push(
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CleanWebpackPlugin(['dist']),
      new webpack.HashedModuleIdsPlugin(),
     new webpack.optimize.UglifyJsPlugin({
       compress: {
         warnings: false,
         conditionals: true,
         unused: true,
         comparisons: true,
         sequences: true,
         dead_code: true,
         if_return: true,
         join_vars: true
       }
     }))
  } else { // dev
    plugins.push(
      // make hot reloading work
      new webpack.HotModuleReplacementPlugin(),
      // show module names instead of numbers in webpack stats
      new webpack.NamedModulesPlugin(),
      // don't spit out any errors in compiled assets
      new webpack.NoEmitOnErrorsPlugin(),
      // load DLL files
      new webpack.DllReferencePlugin({context: __dirname, manifest: require('./dll/react_vendor_manifest.json')}),
      // new webpack.DllReferencePlugin({context: __dirname, manifest: require('./dll/react_dom_manifest.json')}),
      // new webpack.DllReferencePlugin({context: __dirname, manifest: require('./dll/react_router_dom_manifest.json')}),
      // // make DLL assets available for the app to download
      // new AddAssetHtmlPlugin([
      //   { filepath: require.resolve('./dll/react.dll.js') },
      //   { filepath: require.resolve('./dll/react_dom.dll.js') },
      //   { filepath: require.resolve('./dll/react_router_dom.dll.js') }
      // ])
      new AddAssetHtmlPlugin({ filepath: require.resolve('./dll/react_vendor.dll.js') })
    )
  }
  return {
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    entry: {
      main: path.join(sourcePath, 'index.js'),
      // static lib
      vendor: ['react', 'react-dom', 'react-router-dom', 'babel-polyfill']
    },
    output: {
      filename: isProd ? 'js/[name]-[chunkhash].bundle.js' : 'js/[name].bundle.js',
      chunkFilename: isProd ? 'js/[id]-[chunkhash].bundle.js' : 'js/[id].bundle.js',
      path: distPath,
      publicPath: publicPath
    },
    module: {
      rules: [
        // js or jsx loader
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['latest', 'react', 'env', 'stage-2'],
              cacheDirectory: true,
              // Since babel-plugin-transform-runtime includes a polyfill that includes a custom regenerator runtime and core.js, the following usual shimming method using webpack.ProvidePlugin will not work:
              plugins: [
                ['import', { libraryName: 'antd', style: true }] // `style: true` 会加载 less 文件
              ]
            }
          }

        },
      // css loader
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                minimize: isProd
              }}, 'postcss-loader'],
            publicPath: publicPath
          })
        },
      // scss loader
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            publicPath: publicPath,
            fallback: 'style-loader',
            use: [
              // {loader: 'autoprefixer-loader'},

              {
                loader: 'css-loader',
                options: {
                  minimize: isProd,
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader'
              },
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'collapsed',
                  sourceMap: true,
                  includePaths: [sourcePath, path.join(__dirname, './src')]
                }
              }
            ]
          })
        },
        // less loader
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            publicPath: publicPath,
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  // module: true, // css-loader 0.14.5 compatible
                  // modules: true
                  // localIdentName: '[hash:base64:5]'
                  // importLoaders: 1,
                  minimize: isProd
                }
              },
              {
                loader: 'postcss-loader'
              },
              {
                loader: 'less-loader'
              }
            ]
          })
        },
      // images loader
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'url-loader?limit=8024&name=assets/images/[name]-[hash].[ext]',
          options: {
            publicPath: publicPath
          }
        },
        {
          test: /\.(woff2?|otf|eot|ttf)$/i,
          loader: 'url-loader?limit=8024&name=assets/fonts/[name].[ext]',
          options: {
            publicPath: distPath
          }
        },
        {
          test: /\.md$/,
          loader: 'raw-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
      alias: {
        'ASYNC': sourcePath
      }
    },
    plugins,
    stats,
    // webpack dev server
    devServer: {
    // 文件路劲，一般静态文件需要
      contentBase: path.join(__dirname),
    // 是否启用gzip压缩
      compress: true,
    // 是否启用热替换
      hot: true,
      port,
    // 开启任意ip访问
      host,
    // 允许列表中host访问
      allowedHosts,
    // 取消host列表安全检查，开发环境启用，默认关闭，开启则allowedHosts无效
    // disableHostCheck: true,
    // 关闭webpack重启打包信息，错误和警告仍然会显示
      noInfo: true,
    // 浏览器全屏显示编译器错误信息
      overlay: true,
    // 公共文件，浏览器可直接访问，HMR必须
      publicPath: '/'
    }
  }
}