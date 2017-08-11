import mongoose from 'mongoose'


const technologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: String,
  blog: String,
  repo: String,
  logo: String,
  addedBy: { type: String, ref: 'User', required: true },
  createdAt: { type: Number, required: true }
})


export default mongoose.model('Technology', technologySchema)
