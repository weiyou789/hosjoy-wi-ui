/**
 * Created by admin on 2020/7/31.
 */
const pkg = require('../../package.json')
const path = require('path')
const fs = require('fs')
const pkgPath = path.join(__dirname, '../../package.json');
const version_arr = pkg.version.split('.')
let [major, minor, patch] = version_arr
patch++
if(patch>10){
    patch = 0
    minor++
    if(minor>10){
        major = 0
        major++
    }
}
const newVersion = `${major}.${minor}.${patch}`
let pkg_content = fs.readFileSync(pkgPath);
pkg_content = JSON.parse(pkg_content);
pkg_content.version = newVersion
fs.writeFileSync(pkgPath, JSON.stringify(pkg_content, null, 2));