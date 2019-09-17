/* global describe, expect, it */

const list = require('../list')
const FtpServer = require('./support/FtpServer')
const getStream = require('get-stream')

describe('list', () => {
  let server = null

  afterEach(async () => {
    if (server) {
      await server.stop()
      server = null
    }
  })

  it('is a function', () => {
    expect(typeof list).toBe('function')
  })

  it('lists files from the given directory with anonymous user', async () => {
    server = new FtpServer()
    await server.start()

    const stream = await list({ pathname: 'data', ...server.options })
    const filenames = await getStream.array(stream)

    expect(filenames).toEqual(['data/abc.txt', 'data/xyz.txt'])
  })

  it('lists files from the given directory with user/password', async () => {
    server = new FtpServer({ user: 'test', password: '1234' })
    await server.start()

    const stream = await list({ pathname: 'data', ...server.options })
    const filenames = await getStream.array(stream)

    expect(filenames).toEqual(['data/abc.txt', 'data/xyz.txt'])
  })
})
