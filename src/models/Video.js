import mongoose from 'mongoose'

const Schema = mongoose.Schema

const videoSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  link: { type: String, required: true },
  description: String,
  youtubeChannelId: String,
  youtubeChannelTitle: String,
  youtubePrivate: Boolean,
  conference: { type: String, ref: 'Conference' },
  speaker: { type: String, ref: 'Speaker' },
  tags: [{type: String, ref: 'Technology'}],
  attachments: [String],
  addedBy: { type: String, ref: 'User', required: true },
  createdAt: { type: Number, required: true },
  lastModifiedAt: {type: Date},
  lastModifiedBy: { type: String, ref: 'User' }
})

videoSchema.methods.updateData = function (data) {
  this.name = data.name || this.name
  this.link = data.link || this.link
  this.description = data.description || this.description
  this.youtubeChannelId = data.youtubeChannelId || this.youtubeChannelId
  this.youtubeChannelTitle = data.youtubeChannelTitle || this.youtubeChannelTitle
  this.youtubePrivate = data.youtubePrivate || this.youtubePrivate
  this.conference = data.conference || this.conference
  this.speaker = data.speaker || this.speaker
  this.tags = data.tags || this.tags
  this.attachments = data.attachments || this.attachments
  this.lastModifiedBy = data.lastModifiedBy || this.lastModifiedBy
  this.lastModifiedAt = data.lastModifiedAt || this.lastModifiedAt
}

export default mongoose.model('Video', videoSchema)
