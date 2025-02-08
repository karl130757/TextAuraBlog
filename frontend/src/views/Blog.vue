<template>
	<div>
		<!-- Hero Section -->
		<section class="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16 md:py-24">
			<div class="container mx-auto text-center px-4 md:px-6">
				<h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight leading-tight">Join Our Community and Start Sharing Your Stories</h1>
				<p class="text-base sm:text-lg md:text-xl mb-6 max-w-4xl mx-auto font-light">
					Become part of a vibrant network of writers and readers. Sign up now and share your voice, connect with others, and explore inspiring stories.
				</p>
				<router-link
					to="/signup"
					class="bg-white text-indigo-800 py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg font-semibold hover:bg-indigo-200 transition-colors duration-300"
				>
					Join Us Today
				</router-link>
			</div>
		</section>

		<div class="flex flex-col lg:flex-row-reverse gap-6 max-w-7xl mx-auto py-10 px-4">
			<!-- Sidebar -->
			<aside class="lg:block w-full lg:w-1/4 bg-gray-50 p-6 rounded-lg shadow-md lg:mb-0 mb-6">
				<h2 class="text-xl font-bold text-gray-900 mb-4">Welcome to TextAura</h2>
				<p class="text-gray-600 text-sm mb-4">
					TextAura is a place where creativity knows no bounds. Discover new ideas, dive into engaging stories, and interact with the community. Whether you're here to
					find your next favorite read or publish your work, you'll find everything you need.
				</p>
				<p class="text-gray-600 text-sm mb-6">
					Our platform is designed to help you grow as a writer and reader alike. Join the conversation on trending topics, explore insightful articles, and share your
					unique perspective with the world.
				</p>
				<router-link
					v-if="isAuthenticated"
					to="/create-post"
					class="block bg-indigo-600 text-white py-3 text-center rounded-lg font-semibold hover:bg-indigo-700 transition"
				>
					Create a New Post
				</router-link>
				<section class="mt-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-3">Popular Topics</h3>
					<div class="flex flex-wrap gap-2">
						<span class="bg-indigo-100 text-indigo-600 text-sm font-semibold py-2 px-4 rounded-full">#Web Development</span>
						<span class="bg-indigo-100 text-indigo-600 text-sm font-semibold py-2 px-4 rounded-full">#JavaScript</span>
						<span class="bg-indigo-100 text-indigo-600 text-sm font-semibold py-2 px-4 rounded-full">#Vue.js</span>
						<span class="bg-indigo-100 text-indigo-600 text-sm font-semibold py-2 px-4 rounded-full">#Productivity</span>
						<span class="bg-indigo-100 text-indigo-600 text-sm font-semibold py-2 px-4 rounded-full">#Tech Innovations</span>
						<span class="bg-indigo-100 text-indigo-600 text-sm font-semibold py-2 px-4 rounded-full">#Mental Health</span>
					</div>
				</section>
			</aside>

			<!-- Main Content -->
			<section class="flex-1 space-y-6">
				<div class="flex flex-col sm:flex-row justify-between items-center mb-6">
					<h2 class="text-2xl sm:text-3xl font-bold text-gray-900">Latest Blog Posts</h2>

					<input v-model="searchQuery" placeholder="Search posts..." class="border p-2 rounded-lg w-full sm:w-auto mt-4 sm:mt-0" @input="searchPosts" />
				</div>

				<div class="flex flex-col sm:flex-row justify-between items-center mb-20">
					<p class="text-sm text-gray-600 sm:w-3/4 lg:w-1/2">
						Explore the latest articles on topics ranging from technology to personal growth. Stay up to date with insights from writers around the world.
					</p>
				</div>

				<div class="space-y-6">
					<p v-if="paginatedPosts.length === 0" class="text-center text-gray-600">
						<LucideAlertCircle class="w-6 h-6 text-gray-500 inline-block mb-2" />
						No posts available yet. Be the first to share your thoughts!
					</p>
					<div v-else>
						<div v-for="post in paginatedPosts" :key="post.id" class="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-600 hover:scale-105 transition mb-5">
							<!-- Post Header -->
							<div class="flex justify-between items-center mb-4">
								<h3 class="text-xl sm:text-2xl font-semibold mb-2 text-gray-900">{{ truncateText(post.title, 32) }}</h3>
								<div class="text-gray-600 text-sm">
									<span
										>By <b>{{ post.author.firstName }}</b></span
									>
									| <span>{{ formatDate(post.createdAt) }}</span>
								</div>
							</div>

							<!-- Post Content -->
							<div class="prose lg:prose-lg max-w-none text-gray-700" v-html="truncateText(post.content, 100)"></div>
							<div class="flex flex-wrap gap-2 mb-3">
								<span v-for="tag in post.tags" :key="tag" class="bg-indigo-100 text-indigo-600 text-xs font-semibold px-2 py-1 rounded-full"> #{{ tag }} </span>
							</div>

							<!-- Interaction Section -->
							<div class="flex items-center justify-between mt-4 text-gray-600">
								<div class="flex items-center gap-4">
									<!-- Like Button with Icon -->
									<button class="flex items-center gap-1 hover:text-indigo-600"><LucideThumbsUp class="w-5 h-5" /> <span>Like</span></button>
									<!-- Comment Button with Icon -->
									<button class="flex items-center gap-1 hover:text-indigo-600"><LucideMessageSquare class="w-5 h-5" /> <span>Comment</span></button>
								</div>
								<router-link :to="`/post/${post.id}`" class="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-1">
									<LucideArrowRight class="w-4 h-4" /> Read More
								</router-link>
							</div>
						</div>
					</div>

					<div class="flex justify-center mt-6 space-x-2">
						<button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 flex items-center gap-2">
							<LucideChevronLeft class="w-5 h-5" /> Prev
						</button>
						<span class="px-4 py-2 bg-gray-100 rounded-lg">Page {{ currentPage }} of {{ totalPages }}</span>
						<button @click="nextPage" :disabled="currentPage >= totalPages" class="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 flex items-center gap-2">
							Next <LucideChevronRight class="w-5 h-5" />
						</button>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { usePostStore } from '../store/postStore';
import { useAuthStore } from '../store/authStore';
import { LucideThumbsUp, LucideMessageSquare, LucideArrowRight, LucideChevronLeft, LucideChevronRight, LucideAlertCircle } from 'lucide-vue-next';

const postStore = usePostStore();
const authStore = useAuthStore();

postStore.getAllPost();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const isLoading = computed(() => postStore.loading);
const searchQuery = ref('');
const currentPage = ref(1);
const postsPerPage = 5;

const filteredPosts = computed(() => {
	if (!searchQuery.value) return postStore.publicPost;
	return postStore.publicPost.filter(
		(post) => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.value.toLowerCase())
	);
});

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage));
const paginatedPosts = computed(() => {
	const start = (currentPage.value - 1) * postsPerPage;
	return filteredPosts.value.slice(start, start + postsPerPage);
});

const prevPage = () => {
	if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) currentPage.value++;
};

const searchPosts = () => {
	currentPage.value = 1;
};

const truncateText = (text, maxLength) => {
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + '...';
	}
	return text;
};

const formatDate = (date) => {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(date).toLocaleDateString(undefined, options);
};
</script>
