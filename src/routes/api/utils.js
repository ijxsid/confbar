import mongoose from 'mongoose'

export function isValidObjectID (string) {
  return mongoose.Types.ObjectId.isValid(string)
}

export function ConflictError (message) {
  this.name = 'ConflictError'
  this.message = message || 'Conflict Error'
  this.stack = (new Error()).stack
}

ConflictError.prototype = Object.create(Error.prototype)
ConflictError.prototype.constructor = ConflictError
