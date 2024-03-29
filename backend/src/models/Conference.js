import mongoose from 'mongoose'

const Schema = mongoose.Schema

const conferenceSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  logo: String,
  originalLogoURL: String,
  year: Number,
  startDate: Date,
  endDate: Date,
  location: String,
  url: String,
  youtubePlaylistId: String,
  channel: { type: String, ref: 'Channel' },
  addedBy: { type: String, ref: 'User', required: true },
  createdAt: { type: Number, required: true },
  lastModifiedAt: { type: Number },
  lastModifiedBy: { type: String, ref: 'User' }
})

conferenceSchema.methods.updateData = function (data) {
  this.name = data.name || this.name
  this.logo = data.logo || this.logo
  this.originalLogoURL = data.originalLogoURL || this.originalLogoURL
  this.year = data.year || this.year
  this.startDate = data.startDate || this.startDate
  this.endDate = data.endDate || this.endDate
  this.location = data.location || this.location
  this.url = data.url || this.url
  this.lastModifiedBy = data.lastModifiedBy || this.lastModifiedBy
  this.lastModifiedAt = data.lastModifiedAt || this.lastModifiedAt
}


export default mongoose.model('Conference', conferenceSchema)
