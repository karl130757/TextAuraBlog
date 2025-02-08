import { Post } from '../models/Post';
import { Request, Response } from 'express';
import * as postService from '../services/PostService';
import { responseHandler } from '../shared/ResponseHelper';

export const getPosts = async (req: Request, res: Response): Promise<void> => {
	try {
		const posts = await postService.getAllPost();
		responseHandler(res, 200, posts);
	} catch (error) {
		responseHandler(res, 500, null, 'Failed to retrieve posts');
	}
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const post = await postService.getPostById(id);
		if (post) {
			responseHandler(res, 200, post);
		} else {
			responseHandler(res, 404, null, 'Post not found');
		}
	} catch (error) {
		responseHandler(res, 500, null, 'Failed to retrieve  post');
	}
};

export const getPostByAuthor = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = (req as any).user;
		const post = await postService.getPostByAuthor(id);

		if (post) {
			responseHandler(res, 200, post);
		} else {
			responseHandler(res, 404, null, 'Post not found');
		}
	} catch (error) {
		responseHandler(res, 500, null, 'Failed to retrieve  post');
	}
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
	const { title, content, tags, status } = req.body;
	const { id } = (req as any).user;
	const postData: Partial<Post> = { title, content, status, tags, author: id };
	try {
		const post = await postService.createPost(postData);
		responseHandler(res, 201, post);
	} catch (error) {
		responseHandler(res, 400, null, 'Failed to create post');
	}
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const { title, content, tags, author, status } = req.body;
	const postData: Partial<Post> = { title, content, tags, author, status };
	try {
		const post = await postService.updatePost(id, postData);
		if (post) {
			responseHandler(res, 200, post);
		} else {
			responseHandler(res, 404, null, 'Post not found');
		}
	} catch (error) {
		responseHandler(res, 400, null, 'Failed to create post');
	}
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	try {
		const message = await postService.deletePost(id);
		responseHandler(res, 200, { message });
	} catch (error) {
		responseHandler(res, 500, null, 'Failed to delete post');
	}
};
