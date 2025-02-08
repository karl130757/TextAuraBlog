import { Comment } from '../models/Comment';
import { CommentRepository } from '../repositories/CommentRepository';
import { ICommentRepository } from '../repositories/interfaces/ICommentRepository';

const commentRepository: ICommentRepository = new CommentRepository();

export const getAllComment = async (): Promise<Comment[]> => {
	return await commentRepository.findAll();
};

export const getCommentById = async (id: string): Promise<Comment | null> => {
	return await commentRepository.findById(id);
};

export const createComment = async (commentData: Comment): Promise<Comment> => {
	return await commentRepository.create(commentData);
};

export const updateComment = async (id: string, commentData: Comment): Promise<Comment | null> => {
	return await commentRepository.update(id, { ...commentData });
};

export const deleteComment = async (id: string): Promise<string> => {
	const post = await commentRepository.findById(id);

	if (!post) {
		throw new Error('Comment not found');
	}

	await commentRepository.delete(id);
	return `Comment with ID ${id} successfully deleted`;
};
