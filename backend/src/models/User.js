import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  _id: String,
  displayName: String,
  photo: String,
  followers: Number,
  following: Number,
  twitterAccessToken: String,
  twitterAccessTokenSecret: String,
  appToken: String,
  isAdmin: {type: Boolean, default: false}
})

export default mongoose.model('User', userSchema)
