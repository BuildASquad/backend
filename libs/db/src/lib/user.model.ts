// user.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  profile_id?: Types.ObjectId;
  photo?: string;
  createdAt?: Date; 
  updatedAt?: Date; 
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profile_id: { type: Schema.Types.ObjectId, ref: 'Profile' },
    photo: { type: String },
}, { timestamps: true }); 

export const User = model<IUser>('User', UserSchema);