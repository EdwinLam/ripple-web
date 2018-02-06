const fs = require("fs");
const path = require("path");
const Sequelize = require('sequelize')
const DBConfig = require('../config/DBConfig')
let db = {};
// 建立连接
const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
  host: DBConfig.host,
  dialect: 'mysql',
  pool: {
    max: 8,
    min: 1,
    idle: 30000
  },
  define: {
    timestamps: true
  }
})
fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js")
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;