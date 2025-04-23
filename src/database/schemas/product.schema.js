import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  stock: Number,
  price: Number
})

export const ProductModel = mongoose.model('Product', ProductSchema)
