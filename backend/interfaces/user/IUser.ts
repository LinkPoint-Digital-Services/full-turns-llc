import {Document, Types} from 'mongoose';

// Base user properties
export interface IUser {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birthdate?: Date;
  city?: string;
  school?: string;
  profilePicture?: string;
  bio?: string;
  course?: String;
  joinedGroups?: [Types.ObjectId];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  verificationCode?: string;
}

// Model type that includes _id and mongoose document fields
export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}
