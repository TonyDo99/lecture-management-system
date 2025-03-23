import mongoose from 'mongoose'
const { Schema } = mongoose

const lectureSchema = new Schema({
  title: String,
  description: String,
  duration: Number,
  instructor: String,
  date: Date
})

const LectureModel = mongoose.model('LectureModel', lectureSchema)

export default LectureModel
