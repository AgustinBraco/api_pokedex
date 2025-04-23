import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthday: String,
  gender: String,
  email: String,
  password: String,
  role: String
})

export const UserModel = mongoose.model('User', UserSchema)
