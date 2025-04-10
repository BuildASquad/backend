import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ILink {
  name: string;
  link: string;
}
export interface IAddress extends Document {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  state_code: string;
  country_code: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
export interface IProfile extends Document {
  _id: string;
  user_id: string;
  college?: string;
  branch?: string;
  year?: string;
  links: ILink[];
  address?: IAddress;
  created_at?: Date;
  updated_at?: Date;
}

const LinkSchema = new Schema<ILink>(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false }
);

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

const ProfileSchema = new Schema<IProfile>(
  {
    _id: {
      type: Schema.Types.String,
      required: true,
      default: uuidv4,
    },
    user_id: { type: String, required: true },
    college: { type: String },
    branch: { type: String },
    year: { type: String },
    links: LinkSchema,
    address: AddressSchema,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
