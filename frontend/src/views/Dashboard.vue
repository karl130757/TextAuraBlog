<template>
	<section class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10" v-if="!isLoading">
		<!-- Dashboard Header -->
		<div class="mb-6 sm:mb-10">
			<h1 class="text-3xl sm:text-4xl font-bold text-gray-900">Welcome, {{ user.firstName }}</h1>
			<p class="text-gray-600 mt-2 text-sm sm:text-base">
				This is your dashboard where you can manage your blog posts. Create new content, edit existing ones, and track your progress.
			</p>
		</div>

		<!-- Overview Section -->
		<section class="mb-6 sm:mb-8">
			<h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
				<div class="bg-white shadow-md p-4 sm:p-6 rounded-lg flex items-center gap-4">
					<FileText class="text-indigo-600 w-8 h-8 sm:w-10 sm:h-10" />
					<div>
						<h2 class="text-2xl font-bold text-indigo-600">{{ posts.length }}</h2>
						<p class="text-gray-500">Total Posts</p>
					</div>
				</div>
				<div class="bg-white shadow-md p-4 sm:p-6 rounded-lg flex items-center gap-4">
					<CheckCircle class="text-green-600 w-8 h-8 sm:w-10 sm:h-10" />
					<div>
						<h2 class="text-2xl font-bold text-green-600">{{ publishedPosts }}</h2>
						<p class="text-gray-500">Published</p>
					</div>
				</div>
				<div class="bg-white shadow-md p-4 sm:p-6 rounded-lg flex items-center gap-4">
					<File class="text-yellow-600 w-8 h-8 sm:w-10 sm:h-10" />
					<div>
						<h2 class="text-2xl font-bold text-yellow-600">{{ drafts }}</h2>
						<p class="text-gray-500">Drafts</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Post Management Section -->
		<section class="mb-6 sm:mb-8">
			<h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Manage Your Posts</h2>
			<p class="text-gray-600 mb-4 text-sm sm:text-base">Search for posts, create new content, or manage existing ones.</p>

			<div class="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
				<input type="text" v-model="searchQuery" placeholder="Search posts..." class="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-1/3" />
				<router-link to="/create-post" class="mt-4 sm:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
					<Plus class="w-5 h-5" />
					New Post
				</router-link>
			</div>

			<!-- Posts List -->
			<div v-if="filteredPosts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				<div v-for="post in paginatedPosts" :key="post.id" class="bg-white rounded-lg shadow-md p-6">
					<h3 class="text-lg sm:text-xl font-semibold mb-2">{{ post.title }}</h3>
					<div class="prose lg:prose-lg max-w-none text-gray-700 leading-relaxed" v-html="truncateText(post.content, 100)"></div>

					<div class="flex justify-between text-sm text-gray-500 mb-4">
						<span
							>By <strong>{{ post.author.firstName }} {{ post.author.lastName }}</strong></span
						>
						<span>{{ new Date(post.createdAt).toLocaleDateString() }}</span>
					</div>
					<div class="flex gap-2 mb-4">
						<span v-for="tag in post.tags" :key="tag" class="bg-indigo-100 text-indigo-600 text-xs font-semibold py-1 px-3 rounded-full">
							{{ tag }}
						</span>
					</div>
					<div class="flex justify-end gap-3">
						<router-link :to="`/post/${post.id}`" class="text-indigo-600 hover:text-indigo-800">
							<Eye class="w-5 h-5" />
						</router-link>
						<router-link :to="`/edit-post/${post.id}`" class="text-yellow-600 hover:text-yellow-800">
							<Pencil class="w-5 h-5" />
						</router-link>
						<button @click="deletePost(post.id)" class="text-red-600 hover:text-red-800">
							<Trash class="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
			<p v-else class="text-center text-gray-600">No posts found.</p>
		</section>

		<!-- Pagination Controls -->
		<div class="flex justify-center mt-6" v-if="filteredPosts.length > postsPerPage">
			<button @click="prevPage" :disabled="currentPage === 1" class="mx-2 px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50">Previous</button>
			<span class="px-4 py-2">Page {{ currentPage }} of {{ totalPages }}</span>
			<button @click="nextPage" :disabled="currentPage >= totalPages" class="mx-2 px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50">Next</button>
		</div>
	</section>

	<section class="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" v-else>
		<PageLoader :loading="!isLoading" />
	</section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../store/userStore';
import { usePostStore } from '../store/postStore';
import { FileText, CheckCircle, File, Trash, Plus, Eye, Pencil } from 'lucide-vue-next';
import PageLoader from '../components/PageLoader.vue';

const userStore = useUserStore();
userStore.getAuthenticatedUser();
const user = computed(() => userStore.user);

const postStore = usePostStore();
postStore.getUserSpecificPost();

const posts = computed(() => postStore.userSpecificPost || []);

const isLoading = computed(() => userStore.loading && postStore.loading);

const searchQuery = ref('');
const currentPage = ref(1);
const postsPerPage = 6;

// Computed Stats
const publishedPosts = computed(() => posts.value.filter((post) => post.status === 'published').length);
const drafts = computed(() => posts.value.filter((post) => post.status === 'draft').length);

// Pagination
const filteredPosts = computed(() => posts.value.filter((post) => post.title.toLowerCase().includes(searchQuery.value.toLowerCase())));
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage));
const paginatedPosts = computed(() => filteredPosts.value.slice((currentPage.value - 1) * postsPerPage, currentPage.value * postsPerPage));

const truncateText = (text, maxLength) => {
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + '...';
	}
	return text;
};

const prevPage = () => currentPage.value > 1 && currentPage.value--;
const nextPage = () => currentPage.value < totalPages.value && currentPage.value++;

const editPost = (id) => console.log('Edit post', id);
const deletePost = (id) => {
	postStore.deletePost(id);
};
</script>
