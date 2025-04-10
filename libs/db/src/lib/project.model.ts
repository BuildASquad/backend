import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


export interface IProject extends Document {
  _id: string;
  title: string;
  description?: string;
  link?: string;
}

const ProjectSchema = new Schema<IProject>({
  _id: {
    type: Schema.Types.String,
    required: true,
    default: uuidv4,
  },
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
});

export const Project = mongoose.model<IProject>('Project', ProjectSchema);