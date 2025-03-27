import mongoose from 'mongoose'
import './common.model'
const { Schema } = mongoose

const lectureSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true,
    minlength: 5,
    maxlength: 100
  },
  description: {
    type: String,
    default: '',
    trim: true,
    maxlength: 500
  },
  author: {
    type: String,
    default: '',
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  destination: {
    type: String,
    default: ''
  }
})

const LectureModel = mongoose.model('LectureModel', lectureSchema)

export default LectureModel
