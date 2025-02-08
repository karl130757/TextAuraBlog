import mongoose, { Schema, Document } from 'mongoose';

export interface Comment extends Document {
	id: string;
	content: string;
	postId: mongoose.Schema.Types.ObjectId;
	author: mongoose.Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
	{
		content: { type: String, required: true },
		postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
		author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
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

export const CommentModel = mongoose.model<Comment>('Post', CommentSchema);
