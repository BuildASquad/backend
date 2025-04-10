// chat.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IChat extends Document {
  participant_ids: Types.ObjectId[];
  message_ids: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ChatSchema = new Schema<IChat>({
  participant_ids: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  message_ids: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
}, { timestamps: true });

export const Chat = model<IChat>('Chat', ChatSchema);