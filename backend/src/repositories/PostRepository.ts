import { Post } from '../models/Post';
import { IPostRespository } from './interfaces/IPostRepository';
import { PostModel } from './models/PostModel';

const mapToDomain = (post: any): Post => ({
	id: post._id.toString(),
	title: post.title,
	content: post.content,
	status: post.status,
	author: post.author,
	tags: post.tags || [],
	createdAt: post.createdAt || new Date(),
	updatedAt: post.updatedAt || new Date()
});

export class PostRepository implements IPostRespository {
	async findAll(): Promise<Post[]> {
		return (
			await PostModel.find()
				.populate({
					path: 'author',
					select: 'id firstName lastName email'
				})
				.lean()
		).map(mapToDomain);
	}

	async findById(id: string): Promise<Post | null> {
		const post = await PostModel.findById(id)
			.populate({
				path: 'author',
				select: 'id firstName lastName email'
			})
			.exec();
		return post ? mapToDomain(post) : null;
	}

	async findByAuthor(id: string): Promise<Post[]> {
		return (
			await PostModel.find({ author: id })
				.populate({
					path: 'author',
					select: 'id firstName lastName email'
				})
				.lean()
		).map(mapToDomain);
	}

	async create(postData: Partial<Post>): Promise<Post> {
		const newPost = new PostModel(postData);
		const savedPost = await newPost.save();
		return mapToDomain(savedPost);
	}

	async update(id: string, postData: Partial<Post>): Promise<Post | null> {
		const updatedPost = await PostModel.findByIdAndUpdate(id, postData, { new: true }).exec();
		return updatedPost ? mapToDomain(updatedPost) : null;
	}

	async delete(id: string): Promise<void> {
		await PostModel.findByIdAndDelete(id).exec();
	}
}
