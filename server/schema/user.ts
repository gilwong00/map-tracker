import { model, Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = model<UserDocument>('User', userSchema);

export default User;
