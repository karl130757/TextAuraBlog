import { Comment } from '../models/Comment';
import { ICommentRepository } from './interfaces/ICommentRepository';
import { CommentModel } from './models/CommentModel';

const mapToDomain = (post: any): Comment => ({
	id: post._id.toString(),
	content: post.content,
	postId: post._postId.toString(),
	author: post.author.toString(),
	createdAt: post.createdAt || new Date(),
	updatedAt: post.updatedAt || new Date()
});

export class CommentRepository implements ICommentRepository {
	async findAll(): Promise<Comment[]> {
		return (await CommentModel.find().lean()).map(mapToDomain);
	}

	async findById(id: string): Promise<Comment | null> {
		const comment = await CommentModel.findById(id).exec();
		return comment ? mapToDomain(comment) : null;
	}

	async create(commentData: Partial<Comment>): Promise<Comment> {
		const newComment = new CommentModel(commentData);
		const savedComment = await newComment.save();
		return mapToDomain(savedComment);
	}

	async update(id: string, commentData: Partial<Comment>): Promise<Comment | null> {
		const updatedComment = await CommentModel.findByIdAndUpdate(id, commentData, { new: true }).exec();
		return updatedComment ? mapToDomain(updatedComment) : null;
	}

	async delete(id: string): Promise<void> {
		await CommentModel.findByIdAndDelete(id).exec();
	}
}
