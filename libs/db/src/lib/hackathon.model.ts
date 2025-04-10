// hackathon.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IHackathon extends Document {
  title: string;
  description?: string;
  location?: string;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const HackathonSchema = new Schema<IHackathon>({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  url: { type: String },
}, { timestamps: true });

export const Hackathon = model<IHackathon>('Hackathon', HackathonSchema);