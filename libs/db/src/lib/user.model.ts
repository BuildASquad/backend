import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  photo?: string;
  created_at?: Date;
  updated_at?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    _id: {
      type: Schema.Types.String,
      required: true,
      default: uuidv4,
    },
    email: {
      type: String,
      required: true,
    },
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    password:{
      type:String
    },
    photo: {
      type: String
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

UserSchema.index({ email: 1 }, { unique: true });

export const UserModel = mongoose.model<IUser>('User', UserSchema);
