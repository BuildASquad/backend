import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IHackathon extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  url?: string;
  created_at?: Date;
  updated_at?: Date;
}

const HackathonSchema = new Schema<IHackathon>(
  {
    _id: {
      type: Schema.Types.String,
      required: true,
      default: uuidv4,
    },
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    url: { type: String },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export const Hackathon = mongoose.model<IHackathon>(
  'Hackathon',
  HackathonSchema
);
