import mongoose from 'mongoose'

const speakerSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  twitterUsername: String,
  website: String,
  blog: String,
  github: String,
  location: String,
  addedBy: { type: String, ref: 'User', required: true },
  user: {type: String, ref: 'User'},
  createdAt: { type: Number, required: true },
  lastModifiedAt: { type: Number },
  lastModifiedBy: { type: String, ref: 'User' }
})

speakerSchema.methods.updateData = function (data) {
  this.name = data.name || this.name
  this.twitterUsername = data.twitterUsername || this.twitterUsername
  this.website = data.website || this.website
  this.blog = data.blog || this.blog
  this.location = data.location || this.location
  this.user = data.user || this.user
  this.lastModifiedBy = data.lastModifiedBy || this.lastModifiedBy
  this.lastModifiedAt = data.lastModifiedAt || this.lastModifiedAt
}


export default mongoose.model('Speaker', speakerSchema)
