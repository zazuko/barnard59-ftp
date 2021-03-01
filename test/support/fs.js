import fs, { copyFile as _copyFile, createReadStream as _createReadStream, mkdir as _mkdir, readFile as _readFile } from 'fs'
import rimraf from 'rimraf'
import { promisify } from 'util'

const copyFile = promisify(_copyFile)
const createReadStream = _createReadStream
const mkdir = promisify(_mkdir)
const readFile = promisify(_readFile)
const rmdir = promisify(rimraf)

export default {
  ...fs,
  copyFile,
  createReadStream,
  mkdir,
  readFile,
  rmdir
}
