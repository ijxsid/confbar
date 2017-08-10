import mongoose from 'mongoose'

const Schema = mongoose.Schema

const conferenceSchema = new Schema({
  name: { type: String, required: true },
  logo: String,
  year: Number,
  startDate: Date,
  endDate: Date,
  location: String,
  url: String,
  addedBy: { type: String, ref: 'User', required: true },
  createdAt: { type: Number, required: true }
})


export default mongoose.model('Conference', conferenceSchema)
