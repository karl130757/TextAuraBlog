<template>
	<div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-6">
		<div class="w-full max-w-md bg-white p-4 rounded-xl shadow-lg">
			<div class="text-center mb-6">
				<h2 class="text-2xl font-semibold text-gray-800">Sign Up</h2>
				<p class="text-sm text-gray-600 mt-2">Create your account to get started</p>
			</div>

			<form @submit.prevent="handleSignup" class="space-y-4">
				<div class="grid grid-cols-2 gap-2">
					<div>
						<label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
						<input
							v-model="firstName"
							id="firstName"
							type="text"
							placeholder="First Name"
							required
							class="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>

					<div>
						<label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
						<input
							v-model="lastName"
							id="lastName"
							type="text"
							placeholder="Last Name"
							required
							class="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>
				</div>

				<div>
					<label for="displayName" class="block text-sm font-medium text-gray-700">Display Name</label>
					<input
						v-model="displayName"
						id="displayName"
						type="text"
						placeholder="Display Name"
						required
						class="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>

				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<input
						v-model="email"
						id="email"
						type="email"
						placeholder="Email"
						required
						class="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<input
						v-model="password"
						id="password"
						type="password"
						placeholder="Password"
						required
						class="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>

				<div>
					<label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
					<input
						v-model="confirmPassword"
						id="confirmPassword"
						type="password"
						placeholder="Confirm Password"
						required
						class="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>

				<div>
					<button
						type="submit"
						class="w-full py-3 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-indigo-400 disabled:cursor-not-allowed"
						:disabled="loading"
					>
						<span v-if="loading"><Loader size="sm" color="white" /></span>
						<span v-else>Signup</span>
					</button>
				</div>
			</form>

			<div class="mt-4 text-center">
				<p class="text-sm text-gray-600">
					Already have an account?
					<router-link to="/login" class="text-indigo-600 hover:underline">Login</router-link>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import { toast } from 'vue3-toastify';
import Loader from '../components/Loader.vue';

const router = useRouter();
const authStore = useAuthStore();
const loading = computed(() => authStore.loading);

const firstName = ref('');
const lastName = ref('');
const displayName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Simulating sign-up function (you should replace it with actual sign-up logic)
const handleSignup = async () => {
	if (password.value !== confirmPassword.value) {
		toast.error('Passwords do not match!');
		return;
	}

	const postData = {
		firstName: firstName.value,
		lastName: lastName.value,
		displayName: displayName.value,
		email: email.value,
		password: password.value
	};
	const response = await authStore.signup(postData);
	if (response.success) {
		toast.success('Signup Successful');
		setTimeout(() => {
			router.push('/dashboard');
		}, 1000);
	} else {
		toast.error('Signup Failed');
	}
};
</script>

<style scoped>
/* Update background color and form shadow */
.bg-gray-100 {
	background-color: #f7fafc;
}

.bg-white {
	background-color: white;
}

.shadow-lg {
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.w-full {
	width: 100%;
}

.max-w-md {
	max-width: 28rem; /* Adjusted to make the form more compact */
}

.p-4 {
	padding: 1rem; /* Reduced padding */
}
</style>
