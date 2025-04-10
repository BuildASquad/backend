// friend.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IFriend extends Document {
  user_id: Types.ObjectId;
  friend_id: Types.ObjectId;
  status: 'requested' | 'incoming' | 'friend';
  friendship_type: 'blocked' | 'pending' | 'accepted';
  createdAt?: Date; 
  updatedAt?: Date; 
}

const FriendSchema = new Schema<IFriend>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    friend_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['requested', 'incoming', 'friend'],
      default: 'requested',
    },
    friendship_type: {
      type: String,
      enum: ['blocked', 'pending', 'accepted'],
      default: 'pending',
    },
  },
  { timestamps: true } 
);

export const Friend = model<IFriend>('Friend', FriendSchema);