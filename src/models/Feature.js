import mongoose from 'mongoose'

const Schema = mongoose.Schema

const featureSchema = new Schema({
  _id: { type: String, required: true },
  heading: { type: String, required: true },
  type: { type: String, required: true },
  index: Number,
  items: [{ type: String, refPath: 'type' }],
  addedBy: { type: String, ref: 'User', required: true },
  createdAt: { type: Number, required: true },
  lastModifiedAt: { type: Number },
  lastModifiedBy: { type: String, ref: 'User' }
})

featureSchema.methods.addItem = function (newItem) {
  this.items = this.items.concat([newItem])
}
featureSchema.methods.addItems = function (newItems) {
  this.items = this.items.concat(newItems)
}

featureSchema.method.removeItem = function (item) {
  const index = this.items.indexOf(item)
  if (index > -1) {
    this.items = this.items.slice(0, index).concat(this.items.slice(index + 1))
  }
}

featureSchema.methods.updateData = function (data) {
  this.heading = data.heading || this.heading
  this.index = data.index || this.index
  this.items = data.items || this.items
  this.type = data.type || this.type
}


export default mongoose.model('Feature', featureSchema)
