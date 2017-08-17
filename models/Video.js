import mongoose from 'mongoose'

const Schema = mongoose.Schema

const videoSchema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  conference: { type: Schema.Types.ObjectId, ref: 'Conference' },
  speaker: { type: Schema.Types.ObjectId, ref: 'Speaker' },
  tags: [{type: Schema.Types.ObjectId, ref: 'Technology'}],
  attachments: [String],
  addedBy: { type: String, ref: 'User', required: true },
  createdAt: { type: Number, required: true },
  lastModifiedAt: {type: Date},
  lastModifiedBy: { type: String, ref: 'User' }
})

videoSchema.methods.updateData = function (data) {
  this.name = data.name || this.name
  this.link = data.link || this.link
  this.conference = data.conference || this.conference
  this.speaker = data.speaker || this.speaker
  this.tags = data.tags || this.tags
  this.attachments = data.attachments || this.attachments
  this.lastModifiedBy = data.lastModifiedBy || this.lastModifiedBy
  this.lastModifiedAt = data.lastModifiedAt || this.lastModifiedAt
}

export default mongoose.model('Video', videoSchema)
