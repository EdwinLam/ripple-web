const db = require('../models')
db.sequelize.sync().then(function(){
console.log('同步完成')
})