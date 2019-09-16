const Ftp = require('ftp')
const { promisify } = require('util')
const { Readable } = require('readable-stream')

class SftpClient {
  constructor ({ host, port = 21, user, password }) {
    this.host = host
    this.port = port
    this.user = user
    this.password = password
    this.client = new Ftp()
  }

  async connect () {
    this.client.connect({
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password
    })

    return new Promise((resolve, reject) => {
      this.client.once('ready', resolve)
      this.client.once('error', reject)
    })
  }

  async disconnect () {
    this.client.end()

    return new Promise(resolve => {
      this.client.once('close', resolve)
    })
  }

  async list (path) {
    return promisify(this.client.list.bind(this.client))(path)
  }

  async move (source, target) {
    return promisify(this.client.rename.bind(this.client))(source, target)
  }

  async read (path) {
    return new Readable().wrap(await promisify(this.client.get.bind(this.client))(path))
  }
}

module.exports = SftpClient
