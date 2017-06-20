/**
 * Created by xiaolin on 16/12/16.
 */

require('babel-register')
require('es6-promise').polyfill();

const config     = require('../config')
const debug      = require('debug')('app:bin:compile')
const fs         = require('fs-extra')
const path       = require('path')
// const child      = require('child_process')

const paths = config.utils_paths

debug('Create webpack compiler.')
const compiler = require('webpack')(require('../config/_basic_webpack'))


compiler.run(function (err, stats) {
    const jsonStats = stats.toJson()

    debug('Webpack compile completed.')

    var cat = '/Users/projects/compile/stuff-app/com.qbao.aisr.app.web/src/main/webapp'
    var sourcePath = path.join(__dirname,'../dist')
    var fileName = '/stuff'
    fs.stat(cat + fileName, function(err, stat) {
        if(err == null) {
            if(stat.isDirectory()) {

                debug('copy file begin......');
                fs.remove(cat+fileName, function (err) {
                    if (err) {
                        console.log('err',err);
                        throw err;
                    }
                    debug('backup begin......');
                    fs.mkdir(cat+fileName,function(err){
                        fs.copy(sourcePath,cat+fileName, function(err) {
                            if (err) return console.error(err)
                            debug("success!")
                        });
                    })
                });

            } else if(stat.isFile()) {
                console.log('文件存在');
            } else {
                console.log('路径存在，但既不是文件，也不是文件夹');
                //输出路径对象信息
                console.log(stat);
            }
        } else if(err.code == 'ENOENT') {
                    debug('copy file begin......')
                    fs.mkdir(cat+fileName,function(err){
                        fs.copy(sourcePath,cat+fileName, function(err) {
                            if (err) return console.error(err)
                            debug("success!")
                        });
                    })
        } else {
            console.log('错误：' + err);
        }
    });




})
