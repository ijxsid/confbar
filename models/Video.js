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
  createdAt: { type: Number, required: true }
})


export default mongoose.model('Video', videoSchema)
