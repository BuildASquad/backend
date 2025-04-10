// hackathonWin.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IHackathonWin extends Document {
  title: string;
  rank?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const HackathonWinSchema = new Schema<IHackathonWin>({
  title: { type: String, required: true },
  rank: { type: String },
  description: { type: String },
} , { timestamps: true });

export const HackathonWin = model<IHackathonWin>('HackathonWin', HackathonWinSchema);
