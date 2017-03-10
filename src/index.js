/**
 * Created by xiaolin on 16/12/26.
 */
// ------------------------------------
// Android 4.4 Version Below
// ------------------------------------
require('es6-promise').polyfill();

// ------------------------------------
// Resource Import
// ------------------------------------
require.ensure([],
    function(require) {

        var dva = require('dva').default
        var FastClick  = require('fastclick')
        var router  = require('./routes')
        var hotgoods  = require('./model/hotgoods')
        var mycustom  = require('./model/mycustom')
        var selfsupport  = require('./model/selfsupport')
        var model  = require('./model')
        // ------------------------------------
        // App Starting
        // ------------------------------------
        const html5ForStartApp = dva()
        function html5ForLogin(_app) {
            if (_app) {

                _app.model(hotgoods)
                _app.model(mycustom)
                _app.model(selfsupport)
                _app.model(model)

                _app.router(router)

                _app.start('.page-container')

            }
            else {
                html5ForStartApp.model(hotgoods)
                html5ForStartApp.model(mycustom)
                html5ForStartApp.model(selfsupport)
                html5ForStartApp.model(model)

                html5ForStartApp.router(router)

                html5ForStartApp.start('.page-container')
            }

        }

        // ------------------------------------
        // Debug Here
        // ------------------------------------
        html5ForLogin(html5ForStartApp);

        // ------------------------------------
        // Client Login
        // ------------------------------------
        if(navigator.userAgent.match(/Android/i)) {
            if (typeof QBaoJSBridge != 'undefined') {
                QBaoJSBridge.login("mqbii.qbao.com", String(html5ForLogin(html5ForStartApp)));
            }
        }
        else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            if (typeof ioswebview != 'undefined') {
                ioswebview.showLoginViewAnd("mqbii.qbao.com", String(html5ForLogin(html5ForStartApp)));
            }
        }
        else {
            html5ForLogin(html5ForStartApp);
        }

        // ------------------------------------
        // Fast Click Adding For System
        // ------------------------------------
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function () {
                FastClick.attach(document.body);
            }, false);
        }

    }
)
