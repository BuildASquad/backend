import mongoose, { Schema, Document} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IChat extends Document {
  _id: string;
  participant_ids: string[];
  message_ids: string[];
  created_at?: Date;
  updated_at?: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    _id: {
      type: Schema.Types.String,
      required: true,
      default: uuidv4,
    },
    participant_ids: [{ type: String }],
    message_ids: [{ type: String }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export const Chat = mongoose.model<IChat>('Chat', ChatSchema);
