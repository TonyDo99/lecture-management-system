import { Schema, plugin } from 'mongoose';

export interface IAbstractModel {
  email: string;
  password: string;
  name: string;
  role: string;
}

export const commonSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    new: true,
    timestamps: true,
  }
);

plugin((schema: Schema) => {
  schema.add(commonSchema);
});
