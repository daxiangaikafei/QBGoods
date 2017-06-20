/**
 * Created by xiaolin on 16/12/15.
 */
import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import webpackConfig from '../config/_basic_webpack'
import proxy from 'koa-proxy';

const config = require('../config')
const paths = config.utils_paths
const debug  = require('debug')('app:server')
const app    = new Koa()
// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
    verbose: false
})))

//moke http://192.168.132.44:8081/stuff/ad/banner/flashSaleDetail.do
app.use(proxy({
  host: 'http://192.168.132.44:8081',
  match: /^\/stuff\//
}));
//测试服务器
// app.use(proxy({
//   host: 'http://192.168.14.38',
//   match: /^\/stuff\//
// }));
// app.use(proxy({
//   host: 'http://192.168.14.38/',
//   match: /^\/custom\//
// }));
// app.use(proxy({
//   host: 'http://127.0.0.1:80',
//   match: /^\/api\//
// }));


// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------

if (config.env === 'development') {
    const compiler = webpack(webpackConfig)

    // Enable webpack-dev and webpack-hot middleware
    const { publicPath } = webpackConfig.output

    app.use(require('./middleware/webpack-dev')(compiler, publicPath))
    app.use(require('./middleware/webpack-hmr')(compiler))

    // Serve static assets from ~/src/static since Webpack is unaware of
    // these files. This middleware doesn't need to be enabled outside
    // of development since this directory will be copied into ~/dist
    // when the application is compiled.
    app.use(convert(serve(paths.client('static'))))
} else {
    debug(
        'Server is being run outside of live development mode. This starter kit ' +
        'does not provide any production-ready server functionality. To learn ' +
        'more about deployment strategies, check out the "deployment" section ' +
        'in the README.'
    )

    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server, but this helps to demo the
    // server in production.
    app.use(convert(serve(paths.base(config.dir_dist))))
}

export default app
