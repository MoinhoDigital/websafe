import crypto from 'crypto'

export default (bytes) => crypto.randomBytes(bytes || 16).toString('hex')
