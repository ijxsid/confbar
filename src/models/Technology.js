import mongoose from 'mongoose'


const technologySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  website: String,
  blog: String,
  repo: String,
  logo: String,
  description: String,
  twitter: String,
  addedBy: { type: String, ref: 'User', required: true },
  createdAt: { type: Number, required: true },
  lastModifiedAt: { type: Number },
  lastModifiedBy: { type: String, ref: 'User' }
})

technologySchema.methods.updateData = function (data) {
  this.name = data.name || this.name
  this.website = data.website || this.website
  this.blog = data.blog || this.blog
  this.logo = data.logo || this.logo
  this.repo = data.repo || this.repo
  this.description = data.description || this.description
  this.twitter = data.twitter || this.twitter
  this.lastModifiedBy = data.lastModifiedBy || this.lastModifiedBy
  this.lastModifiedAt = data.lastModifiedAt || this.lastModifiedAt
}

export default mongoose.model('Technology', technologySchema)
