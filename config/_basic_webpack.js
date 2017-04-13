/**
 * Created by xiaolin on 16/12/15.
 */
import webpack from 'webpack'
import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'


const debug  = require('debug')('app:config:_basic_webpack')
const config = require('./index')
const paths = config.utils_paths
const {__DEV__, __PROD__, __TEST__} = config.globals
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

debug('create configuration.')
debug(`apply webpack config for NODE_ENV "${config.env}"`)

const webpackConfig = {
    name: 'client',
    target: 'web',
    resolve: {
        root: paths.base(config.dir_client),
        alias: {
            'ui': 'components/ui/index.js'
        },
        extensions: ['', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
    },
    //devtool: 'eval',
    module: {}
}

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = paths.base(config.dir_client) + '/vendor.js'
const APP_ENTRY_PATHGatherGoods = paths.base(config.dir_client) + '/vendorGatherGoods.js'
const APP_ENTRY_PATHHotGoods = paths.base(config.dir_client) + '/vendorHotGoods.js'
const APP_ENTRY_PATHSelfSupport = paths.base(config.dir_client) + '/vendorSelfSupport.js'
const APP_ENTRY_PATHGatherStore = paths.base(config.dir_client) + '/vendorGatherStore.js'
const APP_ENTRY_PATHMyCustom = paths.base(config.dir_client) + '/vendorMyCustom.js'

webpackConfig.entry = {
    index: __DEV__
        ? [APP_ENTRY_PATH, 'webpack-hot-middleware/client?path=/__webpack_hmr']
        : [APP_ENTRY_PATH],
    indexGatherGoods: __DEV__
        ? [APP_ENTRY_PATHGatherGoods, 'webpack-hot-middleware/client?path=/__webpack_hmr']
        : [APP_ENTRY_PATHGatherGoods],
    indexHotGoods: __DEV__
        ? [APP_ENTRY_PATHHotGoods, 'webpack-hot-middleware/client?path=/__webpack_hmr']
        : [APP_ENTRY_PATHHotGoods],
    indexSelfSupport: __DEV__
        ? [APP_ENTRY_PATHSelfSupport, 'webpack-hot-middleware/client?path=/__webpack_hmr']
        : [APP_ENTRY_PATHSelfSupport],
    indexGatherStore: __DEV__
        ? [APP_ENTRY_PATHGatherStore, 'webpack-hot-middleware/client?path=/__webpack_hmr']
        : [APP_ENTRY_PATHGatherStore],
    indexMyCustom: __DEV__
        ? [APP_ENTRY_PATHMyCustom, 'webpack-hot-middleware/client?path=/__webpack_hmr']
        : [APP_ENTRY_PATHMyCustom]
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
    filename: `[name].[${config.compiler_hash_type}].js`,
    path: paths.base(config.dir_dist),
    publicPath: config.compiler_public_path
}
// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
    new webpack.DefinePlugin(config.globals),
    new webpack.optimize.OccurrenceOrderPlugin()
    // new webpack.optimize.DedupePlugin()
]

Object.keys(webpackConfig.entry).forEach(function(name) {

    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
        // 每个html的模版，这里多个页面使用同一个模版
        template: paths.client('template.html'),
        favicon: paths.client('static/favicon.ico'),
        hash: false,
        // 生成出来的html文件名
        filename: name + '.html',
        // 自动将引用插入html
        inject: 'html',
        minify: {
            collapseWhitespace: true
        },
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: [name]
    });
    webpackConfig.plugins.push(plugin);
})



if (__DEV__) {
    debug('Enable plugins for live development (HMR, NoErrors).')
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    )
}else if (__PROD__) {
    debug('Apply UglifyJS plugin.');
    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    )
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            }
            //,sourceMap:true
            ,mangle: {
                except: ['html5ForLogin','html5ForStartApp']
            }
        })
    )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
    //webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    //    names: ['vendor']
    //}))
}


// ------------------------------------
// Pre-Loaders
// ------------------------------------
// webpackConfig.module.preLoaders = [{
//     test: /\.(js|jsx)$/,
//     loader: 'eslint',
//     exclude: /node_modules/
// }]

// webpackConfig.eslint = {
//     configFile: paths.base('.eslintrc'),
//     emitWarning: __DEV__
// }

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
        cacheDirectory: true,
        plugins: ['transform-runtime', "add-module-exports","transform-object-assign"],
        presets: __DEV__
            ? ['es2015', 'react', 'stage-0', 'react-hmre']
            : ['es2015', 'react', 'stage-0']
    }
},
{
    test: /\.json$/,
    loader: 'json'
}]

// Styles
const cssLoader = !config.compiler_css_modules
    ? 'css?sourceMap'
    : [
    'css?modules',
    'sourceMap',
    'importLoaders=1',
    'localIdentName=[local]'
].join('&')

// CSS-Modules
const cssModulesLoader = !config.compiler_css_modules
    ? 'css?sourceMap'
    : [
    'css?modules',
    'sourceMap',
    'importLoaders=1',
    'localIdentName=[path]___[name]__[local]___[hash:base64:5]'
].join('&')

webpackConfig.module.loaders.push(
  {
    test: /\.(less|css)$/,
    include: /(src|src\/static\/style)/,
    exclude: /(node_modules|src\/views\/Home\/|src\/views\/GatherGoods\/|src\/views\/GatherStore\/|src\/views\/Activity\/|src\/views\/IconDoc\/)/,
    loaders: [
        'style',
        cssLoader,
        'postcss',
        'less'
    ]
  },
  {
    test: /\.(less|css)$/,
    include: /(src\/views\/Home\/|src\/views\/GatherGoods\/|src\/views\/GatherStore\/|src\/views\/Activity\/|src\/views\/IconDoc\/)/,
    exclude: /node_modules/,
    loaders: [
        'style',
        cssModulesLoader,
        'postcss',
        'less'
    ]
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    loaders: [
        'style',
        cssLoader,
        'postcss',
        'sass-loader'
    ]
  }
)

//webpackConfig.lessLoader = {
//    includePaths: paths.base('styles')
//}
//webpackConfig.postcss = function () {
//    return [ require('precss')];
//}
webpackConfig.postcss = [
    //cssnano({
    //    //sourcemap: true,
    //    //autoprefixer: {
    //    //    add: true,
    //    //    //remove: true
    //    //},
    //    //safe: true,
    //    //discardComments: {
    //    //    //removeAll: true
    //    //}
    //})
]

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
    { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
    { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
    { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
    { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
    { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
    { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
    { test: /\.(png|jpg|gif)$/,    loader: 'url?limit=1024&name=images/[path][name].[ext]' }
)

// ------------------------------------
// Finalize Configuration
// ------------------------------------
if (!__DEV__) {
    debug('Apply ExtractTextPlugin to CSS loaders.')
    webpackConfig.module.loaders.filter(loader =>
        loader.loaders &&
        loader.loaders.find(name => /css/.test(name.split('?')[0]))
    ).forEach(loader => {
        const [first, ...rest] = loader.loaders
        loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
        delete loader.loaders
    })


    webpackConfig.plugins.push(
        new ExtractTextPlugin('[name].[contenthash].css', {
            allChunks: true
        }),
        new BundleAnalyzerPlugin()

    )
}


export default webpackConfig