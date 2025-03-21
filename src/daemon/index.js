const fs = require('fs')
const path = require('path')
// const util = require('util')
const exitHook = require('exit-hook')
const httpProxy = require('http-proxy')
const conf = require('../conf')
const pidFile = require('../pid-file')
const servers = require('./group')()
const server = require('./app')(servers)

pidFile.create()
exitHook(() => {
  console.log('Exiting')
  console.log('Remove pid file')
  pidFile.remove()
})

const ssl = {}
const { HOME, HOMEPATH, USERPROFILE } = process.env
const homePath = HOME || HOMEPATH || USERPROFILE

if (conf.key_path && conf.cert_path) {
  ssl.key = fs.readFileSync(path.resolve(homePath, conf.key_path))
  ssl.cert = fs.readFileSync(path.resolve(homePath, conf.cert_path))
} else {
  ssl.key = fs.readFileSync(path.join(__dirname, 'certs/server.key'))
  ssl.cert = fs.readFileSync(path.join(__dirname, 'certs/server.crt'))
}

const proxy = httpProxy.createServer({
  target: {
    host: '127.0.0.1',
    port: conf.port
  },
  ssl,
  ws: true
})

proxy.listen(conf.port + 1)

server.listen(conf.port, conf.host, function () {
  console.log(`Server listening on port ${conf.host}:${conf.port}`)
})
