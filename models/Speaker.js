import mongoose from 'mongoose'


const speakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  twitterUsername: String,
  website: String,
  blog: String,
  github: String,
  location: String,
  addedBy: { type: String, ref: 'User', required: true },
  user: {type: String, ref: 'User'},
  createdAt: { type: Number, required: true }
})


export default mongoose.model('Speaker', speakerSchema)
