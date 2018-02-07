import mongoose from 'mongoose'
import { makeId } from '../../models/utils'

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
function generateDataWithId (input) {
  return Object.assign({}, input, { _id: makeId() })
}

export function addModel (Model, input) {
  const data = generateDataWithId(input)
  const newObj = new Model(data)

  return newObj.save()
    .catch(err => {
      if (err.code === 11000) { // Handle Duplicate Error
        return addModel(Model, input)
      } else {
        throw err
      }
    })
}
