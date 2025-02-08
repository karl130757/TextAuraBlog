<template>
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
			<div class="text-center mb-6">
				<h2 class="text-3xl font-semibold text-gray-800">Login to Your Account</h2>
				<p class="text-sm text-gray-600 mt-2">Welcome back! Please enter your credentials to continue.</p>
			</div>

			<form @submit.prevent="handleLogin">
				<div class="mb-4">
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<input
						v-model="email"
						id="email"
						type="email"
						placeholder="Enter your email"
						required
						class="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						:disabled="loading"
					/>
				</div>

				<div class="mb-6">
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<input
						v-model="password"
						id="password"
						type="password"
						placeholder="Enter your password"
						required
						class="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						:disabled="loading"
					/>
				</div>

				<button
					type="submit"
					class="w-full py-3 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-indigo-400 disabled:cursor-not-allowed"
					:disabled="loading"
				>
					<span v-if="loading"><Loader size="sm" color="white" /></span>
					<span v-else>Login</span>
				</button>
			</form>

			<div class="mt-4 text-center">
				<p class="text-sm text-gray-600">
					Don't have an account?
					<router-link to="/signup" class="text-indigo-600 hover:underline">Sign Up</router-link>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import Loader from '../components/Loader.vue';
import { toast } from 'vue3-toastify';

const router = useRouter();
const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const loading = computed(() => authStore.loading);

const handleLogin = async () => {
	const response = await authStore.login(email.value, password.value);

	if (response.success) {
		toast.success('Login Successful');
		setTimeout(() => {
			router.push('/dashboard');
		}, 1000);
	} else {
		toast.error('Invalid email or password');
	}
};
</script>
