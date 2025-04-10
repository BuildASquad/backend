import { Schema, model, Document } from 'mongoose';

export interface ILocation extends Document {
  city: string;
  state: string;
  country: string;
  postal_code?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  createdAt?: Date; 
  updatedAt?: Date; 
}

const LocationSchema = new Schema<ILocation>({
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: String },
  coordinates: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
}, { timestamps: true });

export const Location = model<ILocation>('Location', LocationSchema);
