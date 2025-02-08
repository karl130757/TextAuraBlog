import { defineStore } from 'pinia';
import apiService from '../services/apiService';

export const usePostStore = defineStore('post', {
	state: () => ({
		post: [],
		publicPost: [],
		userSpecificPost: [],
		loading: false,
		error: null
	}),
	actions: {
		async getAllPost() {
			this.loading = true;
			this.error = null;
			try {
				const response = await apiService.get('/posts');
				const { success, data } = response.data;
				if (success) {
					this.publicPost = data;
				}
			} catch (err) {
				this.error = err.response?.data?.message || 'An error occurred';
			} finally {
				this.loading = false;
			}
		},
		async getPostById(id) {
			this.loading = true;
			this.error = null;
			try {
				const response = await apiService.get(`/posts/${id}`);
				const { success, data } = response.data;
				if (success) {
					this.post = data;
				}
			} catch (err) {
				this.error = err.response?.data?.message || 'An error occurred';
			} finally {
				this.loading = false;
			}
		},
		async getUserSpecificPost() {
			this.loading = true;
			this.error = null;
			try {
				const response = await apiService.get(`/posts/my-post`);
				const { success, data } = response.data;
				if (success) {
					this.userSpecificPost = data;
				}
			} catch (err) {
				this.error = err.response?.data?.message || 'An error occurred';
			} finally {
				this.loading = false;
			}
		},
		async createPost(postData) {
			const { title, content, status, tags } = postData;
			this.loading = true;
			this.error = null;
			try {
				const response = await apiService.post(`/posts`, { title, content, status, tags });
				if (response.data.success) {
					return { success: true };
				} else {
					return { success: false };
				}
			} catch (err) {
				this.error = err.response?.data?.message || 'An error occurred';
			} finally {
				this.loading = false;
			}
		},
		async updatePost(postData) {
			const { id, title, content, status, tags } = postData;
			this.loading = true;
			this.error = null;
			try {
				const response = await apiService.put(`/posts/${id}`, { title, content, status, tags });
				if (response.data.success) {
					return { success: true };
				} else {
					return { success: false };
				}
			} catch (err) {
				this.error = err.response?.data?.message || 'An error occurred';
			} finally {
				this.loading = false;
			}
		},
		async deletePost(id) {
			const index = this.userSpecificPost.findIndex((post) => post.id === id);
			this.userSpecificPost.splice(index, 1);

			this.loading = true;
			this.error = null;
			try {
				const response = await apiService.delete(`/posts/${id}`);
				const { success, data } = response.data;
				if (success) {
					return { success };
				}
			} catch (err) {
				this.error = err.response?.data?.message || 'An error occurred';
			} finally {
				this.loading = false;
			}
		}
	}
});
