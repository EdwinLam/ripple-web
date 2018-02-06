// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  prod: {
    env: require('./prod.env')
  },
  dev: {
    env: require('./dev.env')
  }
}
