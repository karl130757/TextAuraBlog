import { Post } from '../models/Post';
import { PostRepository } from '../repositories/PostRepository';
import { IPostRespository } from '../repositories/interfaces/IPostRepository';

const postRepository: IPostRespository = new PostRepository();

export const getAllPost = async (): Promise<Post[]> => {
	return await postRepository.findAll();
};

export const getPostById = async (id: string): Promise<Post | null> => {
	return await postRepository.findById(id);
};

export const getPostByAuthor = async (id: string): Promise<Post[]> => {
	return await postRepository.findByAuthor(id);
};

export const createPost = async (postData: Partial<Post>): Promise<Post> => {
	return await postRepository.create(postData);
};

export const updatePost = async (id: string, postData: Partial<Post>): Promise<Post | null> => {
	return await postRepository.update(id, { ...postData });
};

export const deletePost = async (id: string): Promise<string> => {
	const post = await postRepository.findById(id);

	if (!post) {
		throw new Error('Post not found');
	}

	await postRepository.delete(id);
	return `Post with ID ${id} successfully deleted`;
};
