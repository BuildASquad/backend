// profile.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IProfile extends Document {
  college?: string;
  branch?: string;
  year?: string;
  links?: Map<string, string>;
  project_ids: Types.ObjectId[];
  experience_ids: Types.ObjectId[];
  hackathon_win_ids: Types.ObjectId[];
  location?: Types.ObjectId;
  createdAt?: Date; 
  updatedAt?: Date; 
}

const ProfileSchema = new Schema<IProfile>({
  college: { type: String },
  branch: { type: String },
  year: { type: String },
  links: { type: Map, of: String },
  project_ids: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  experience_ids: [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
  hackathon_win_ids: [{ type: Schema.Types.ObjectId, ref: 'HackathonWin' }],
  location: { type: Schema.Types.ObjectId, ref: 'Location' },
}, { timestamps: true }); 

export const Profile = model<IProfile>('Profile', ProfileSchema);