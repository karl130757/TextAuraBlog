import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface Post extends Document {
	id: string;
	title: string;
	content: string;
	status: string;
	author: ObjectId;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}

const PostSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		status: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		tags: [String]
	},
	{
		toJSON: {
			virtuals: true,
			transform: function (doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				return ret;
			}
		},
		timestamps: true
	}
);

export const PostModel = mongoose.model<Post>('Post', PostSchema);
