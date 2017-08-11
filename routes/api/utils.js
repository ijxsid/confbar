import mongoose from 'mongoose'

export function isValidObjectID (string) {
  return mongoose.Types.ObjectId.isValid(string)
}
