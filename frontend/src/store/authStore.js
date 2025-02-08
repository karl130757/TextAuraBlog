import { defineStore } from 'pinia';
import apiService from '../services/apiService';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: !!localStorage.getItem('authToken'),
		loading: false,
		error: null
	}),
	actions: {
		async login(email, password) {
			this.loading = true;
			this.error = null;
			try {
				const response = await apiService.post('/auth/login', { email, password });

				if (response.data.success) {
					const { token } = response.data.data;
					localStorage.setItem('authToken', token);
					this.isAuthenticated = true;
					return { success: true };
				} else {
					return { success: false, message: 'Invalid credentials' };
				}
			} catch (err) {
				this.error = err.response?.data?.message || 'An error occurred';
				return { success: false, message: this.error };
			} finally {
				this.loading = false;
			}
		},

		async signup(postData) {
			this.loading = true;
			this.error = null;
			try {
				const { firstName, lastName, displayName, email, password } = postData;
				const response = await apiService.post('/auth/signup', { firstName, lastName, displayName, email, password });

				if (response.data.success) {
					const { token } = response.data.data;
					localStorage.setItem('authToken', token);
					this.isAuthenticated = true;
					return { success: true };
				} else {
					return { success: false, message: 'Invalid credentials' };
				}
			} catch (err) {
				this.error = err.response?.data?.message || 'An error occurred';
				return { success: false, message: this.error };
			} finally {
				this.loading = false;
			}
		},

		logout() {
			this.isAuthenticated = false;
			localStorage.removeItem('authToken');
		},

		checkAuth() {
			this.isAuthenticated = !!localStorage.getItem('authToken');
		}
	}
});
