const fs = require('fs')
const path = require('path')
const _ = require('lodash')
let service = {};

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  }).forEach(function (file) {
    const key = _.camelCase(file.replace("Service.js",""))
    const oClass = require("./"+file)
    service[key] = new oClass()
})
module.exports = service;