import mongoose from 'mongoose'
import './common.model'
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    // require: true,
    unique: true
  },
  password: {
    type: String
    // required: true
  },
  name: {
    type: String
    // required: true
  },
  age: {
    type: Number,
    min: 0,
    max: 150,
    required: false
  },
  role: {
    enum: ['user', 'admin']
    // required: true
  }
})

const UserModel = mongoose.model('UserModel', userSchema)

export default UserModel
