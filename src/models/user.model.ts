import mongoose from 'mongoose';
import './common.model';
import { IAbstractModel } from './common.model';
const { Schema } = mongoose;

export interface IUser extends IAbstractModel {
  email: string;
  password: string;
  name: string;
  role: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    // require: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true
  },
  name: {
    type: String,
    // required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    // required: true
  },
});

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
