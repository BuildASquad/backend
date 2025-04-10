// message.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  chat_id: Types.ObjectId;
  sender_id: Types.ObjectId;
  message: string;
  read_status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const MessageSchema = new Schema<IMessage>({
  chat_id: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  read_status: { type: Boolean, default: false },
}, { timestamps: true });

export const Message = model<IMessage>('Message', MessageSchema);