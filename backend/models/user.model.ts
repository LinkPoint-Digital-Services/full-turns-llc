import {Schema, model} from 'mongoose';
import {IUserDocument} from '../interfaces/user/IUser';

const UserSchema = new Schema<IUserDocument>(
  {
    username: {type: String, required: true, unique: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    first_name: {type: String, required: false, default: ''},
    last_name: {type: String, required: false},
    birthdate: {type: Date, required: true},
    city: {type: String, required: false},
    profilePicture: {type: String},
    bio: {type: String, default: ''},
    course: {type: String, default: ''},
    school: {type: String, default: ''},
    joinedGroups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
    followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    following: [{type: Schema.Types.ObjectId, ref: 'User'}],
    verificationCode: {type: String, default: ''}
  },
  {timestamps: true}
);

export const UserModel = model<IUserDocument>('User', UserSchema);