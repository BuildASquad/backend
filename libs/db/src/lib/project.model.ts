// project.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description?: string;
  link?: string;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
});

export const Project = model<IProject>('Project', ProjectSchema);