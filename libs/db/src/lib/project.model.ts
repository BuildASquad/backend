import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IProject extends Document {
  _id: string;
  title: string;
  description?: string;
  link?: string;
  created_at?: Date;
  updated_at?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    _id: {
      type: Schema.Types.String,
      required: true,
      default: uuidv4,
    },
    title: { type: String, required: true },
    description: { type: String },
    link: { type: String },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export const Project = mongoose.model<IProject>('Project', ProjectSchema);