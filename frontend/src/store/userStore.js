import { defineStore } from 'pinia';
import apiService from '../services/apiService';

export const useUserStore = defineStore('user', {
	state: () => ({
		user: null,
		loading: false,
		error: null
	}),
	actions: {
		async getAuthenticatedUser() {
			this.loading = true;
			this.error = null;
			try {
				const response = await apiService.get('/users/me');
				const { success, data } = response.data;
				if (success) {
					this.user = data;
				}
			} catch (err) {
				this.error = err.response?.data?.message || 'An error occurred';
			} finally {
				this.loading = false;
			}
		}
	}
});
