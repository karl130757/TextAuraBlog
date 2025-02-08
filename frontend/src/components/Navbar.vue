<template>
	<div class="flex">
		<!-- Sidebar -->
		<aside
			:class="[
				'bg-indigo-800 text-white h-screen p-6 space-y-8 fixed transform transition-transform duration-300',
				isOpen ? 'translate-x-0' : '-translate-x-full',
				'lg:translate-x-0 w-64'
			]"
		>
			<!-- Branding -->
			<div class="flex flex-col items-center justify-start mt-5 mb-12">
				<h2 class="text-3xl font-extrabold tracking-tight leading-tight">TextAura</h2>
				<p class="mt-2 text-sm font-extralight">discover, share, and connect</p>
			</div>

			<!-- Navigation Links and Buttons -->
			<nav class="flex flex-col space-y-4 mt-12">
				<router-link to="/" class="nav-item"> <LucideHome class="mr-3 w-5 h-5" /> <span>Home</span> </router-link>
				<router-link to="/blog" class="nav-item"> <LucideBookOpen class="mr-3 w-5 h-5" /> <span>Blog</span> </router-link>
				<router-link to="/about" class="nav-item"> <LucideInfo class="mr-3 w-5 h-5" /> <span>About</span> </router-link>

				<!-- Authentication Links -->
				<div v-if="!isAuthenticated" class="mt-8 space-y-4">
					<router-link to="/login" class="btn-item bg-indigo-600 text-white hover:bg-indigo-700"> <LucideLogIn class="mr-3 w-5 h-5" /> <span>Login</span> </router-link>
					<router-link to="/signup" class="btn-item text-indigo-600 hover:bg-indigo-200"> <LucideUserPlus class="mr-3 w-5 h-5" /> <span>Sign Up</span> </router-link>
				</div>
				<div v-if="isAuthenticated" class="mt-8 space-y-4">
					<router-link to="/dashboard" class="btn-item bg-indigo-600 text-white hover:bg-indigo-700">
						<LucideLayoutDashboard class="mr-3 w-5 h-5" /> <span>Dashboard</span>
					</router-link>
					<router-link to="/logout" class="btn-item text-red-600 hover:bg-red-200"> <LucideLogOut class="mr-3 w-5 h-5" /> <span>Logout</span> </router-link>
				</div>
			</nav>
		</aside>

		<!-- Mobile Toggle Button -->
		<button @click="toggleSidebar" class="lg:hidden p-3 fixed top-4 left-4 z-50 bg-indigo-600 text-white rounded-full shadow-md">
			<LucideMenu v-if="!isOpen" />
			<LucideX v-else />
		</button>

		<!-- Main Content Area -->
		<main class="w-full transition-all duration-300" :class="isOpen ? 'ml-64' : 'ml-0 lg:ml-64'">
			<slot></slot>
		</main>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../store/authStore';
import { LucideHome, LucideBookOpen, LucideInfo, LucideLogIn, LucideUserPlus, LucideLayoutDashboard, LucideLogOut, LucideMenu, LucideX } from 'lucide-vue-next';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const isOpen = ref(false);

const toggleSidebar = () => {
	isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.nav-item,
.btn-item {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 12px 24px;
	font-size: 1.125rem;
	font-weight: 600;
	text-align: left;
	border-radius: 9999px;
	transition: all 0.3s ease-in-out;
}

.nav-item {
	color: white;
	background-color: transparent;
}

.nav-item:hover {
	color: #4c51bf;
	background-color: rgba(255, 255, 255, 0.1);
}

.btn-item:hover {
	transform: scale(1.05);
}

.text-red-600:hover {
	background-color: rgba(239, 68, 68, 0.1);
}

main {
	transition: margin-left 0.3s ease-in-out;
}
</style>
