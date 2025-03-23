import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  age: Number,
  role: String
})

const UserModel = mongoose.model('UserModel', userSchema)

export default UserModel
