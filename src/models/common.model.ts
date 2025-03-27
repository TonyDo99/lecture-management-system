import { Schema, plugin } from 'mongoose'

export const commonSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    new: true,
    timestamps: true
  }
)

plugin((schema: Schema) => {
  schema.add(commonSchema)
})
