import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
	id?: string;
	firstName: string;
	lastName: string;
	displayName?: string;
	email: string;
	password: string;
	googleId?: string; // Optional if not all users use Google
	deviceToken?: string; // Optional as it might not always be present
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		displayName: { type: String, required: false },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		googleId: { type: String, default: null },
		deviceToken: { type: String, required: false }
	},
	{
		toJSON: {
			virtuals: true,
			transform: function (doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
				return ret;
			}
		},
		timestamps: true
	}
);

export const UserModel = mongoose.model<User>('User', UserSchema);
