// hackathonInterest.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IHackathonInterest extends Document {
  user_id: Types.ObjectId;
  hackathon_id: Types.ObjectId;
  status: 'interested' | 'uninterested';
  createdAt?: Date;
  updatedAt?: Date; 
}

const HackathonInterestSchema = new Schema<IHackathonInterest>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hackathon_id: { type: Schema.Types.ObjectId, ref: 'Hackathon', required: true },
  status: { type: String, enum: ['interested', 'uninterested'], required: true },
}, { timestamps: true }); 

export const HackathonInterest = model<IHackathonInterest>('HackathonInterest', HackathonInterestSchema);
