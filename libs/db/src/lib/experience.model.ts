// experience.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  position?: string;
  duration?: string;
  location?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ExperienceSchema = new Schema<IExperience>({
  company: { type: String, required: true },
  position: { type: String },
  duration: { type: String },
  location: { type: Schema.Types.ObjectId, ref: 'Location' }, 
} , { timestamps: true });

export const Experience = model<IExperience>('Experience', ExperienceSchema);
