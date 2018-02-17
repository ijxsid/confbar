import mongoose from 'mongoose'

const Schema = mongoose.Schema

const channelSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  logo: String,
  uploadsPlayListId: String,
  lastFetchedVideo: String,
  videoCount: Number,
  subscriberCount: Number,
  viewCount: Number,
  lastFetched: Number,
  addedBy: { type: String, ref: 'User', required: true },
  createdAt: { type: Number, required: true },
  lastModifiedAt: { type: Number },
  lastModifiedBy: { type: String, ref: 'User' }
})

channelSchema.methods.updateData = function (data) {
  this.name = data.name || this.name
  this.type = data.type || this.type
  this.description = data.description || this.description
  this.logo = data.logo || this.logo
  this.uploadsPlayListId = data.uploadsPlayListId || this.uploadsPlayListId
  this.lastFetchedVideo = data.lastFetchedVideo || this.lastFetchedVideo
  this.lastFetched = data.lastFetched || this.lastFetched
  this.videoCount = data.videoCount || this.videoCount
  this.subscriberCount = data.subscriberCount || this.subscriberCount
  this.viewCount = data.viewCount || this.viewCount
  this.lastModifiedBy = data.lastModifiedBy || this.lastModifiedBy
  this.lastModifiedAt = data.lastModifiedAt || this.lastModifiedAt
}


export default mongoose.model('Channel', channelSchema)
