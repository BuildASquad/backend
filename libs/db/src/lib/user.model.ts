import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  _id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  photo?: string;
  provider?: 'local' | 'google';
  googleId?: string;
  created_at?: Date;
  updated_at?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    password: {
      type: String,
    },
    photo: {
      type: String,
    },
    provider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    googleId: {
      type: String,
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

export const User = mongoose.model<IUser>('User', UserSchema);
