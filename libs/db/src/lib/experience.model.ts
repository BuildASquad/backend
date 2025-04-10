import mongoose, { Schema, Document } from 'mongoose';
import { IAddress } from './profile.model';
import { v4 as uuidv4 } from 'uuid';

export interface IExperience extends Document {
  _id: string;
  profile_id: string;
  user_id: string;
  company: string;
  position?: string;
  duration?: string;
  address?: IAddress;
  created_at?: Date;
  updated_at?: Date;
}

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: String, required: true },
  state_code: { type: String, required: true },
  country_code: { type: String, required: true },
  coordinates: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
});

const ExperienceSchema = new Schema<IExperience>(
  {
    _id: {
      type: Schema.Types.String,
      required: true,
      default: uuidv4,
    },
    profile_id: { type: String, required: true },
    user_id: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String },
    duration: { type: String },
    address: AddressSchema,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export const Experience = mongoose.model<IExperience>(
  'Experience',
  ExperienceSchema
);
