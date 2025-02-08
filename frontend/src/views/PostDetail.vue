<template>
	<section class="py-16 bg-gray-50" v-if="!isLoading">
		<div class="max-w-4xl mx-auto px-6 lg:px-8 bg-white rounded-lg shadow-md p-8">
			<!-- Post Header -->
			<div class="mb-6 text-center">
				<h1 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{{ post.title }}</h1>
				<p class="text-gray-500 text-sm sm:text-base">
					By <span class="font-semibold text-indigo-600">{{ post.author.firstName }} {{ post.author.lastName }}</span> •
					{{ formattedDate(post.createdAt) }}
				</p>
				<!-- Tags -->
				<div class="flex justify-center gap-2 mt-3">
					<span v-for="tag in post.tags" :key="tag" class="bg-indigo-100 text-indigo-600 text-xs font-semibold py-1 px-3 rounded-full">
						{{ tag }}
					</span>
				</div>
			</div>

			<!-- Post Content (Supports Rich Text) -->
			<div class="prose lg:prose-lg max-w-none text-gray-700 leading-relaxed" v-html="post.content"></div>

			<!-- Author Section -->
			<div class="mt-10 p-6 bg-gray-100 rounded-lg flex items-center gap-4">
				<div class="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
					{{ post.author.firstName[0] }}
				</div>
				<div>
					<h3 class="text-lg font-semibold">{{ post.author.firstName }} {{ post.author.lastName }}</h3>
					<p class="text-gray-500 text-sm">Author of {{ post.title }}</p>
				</div>
			</div>

			<!-- Comments Section (Future Implementation) -->
			<div class="mt-12">
				<h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
					<LucideMessageCircle size="24" class="text-indigo-600" />
					Comments
				</h2>
				<p class="text-gray-500 italic">Comments will be available soon...</p>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '../store/postStore';
import { LucideMessageCircle } from 'lucide-vue-next';

const route = useRoute();
const postStore = usePostStore();
const postId = ref(route.params.id);
postStore.getPostById(postId.value);
const post = computed(() => postStore.post);
const isLoading = computed(() => postStore.loading);

// Format Date
const formattedDate = (dateString) => {
	return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
</script>

<style scoped>
/* Ensures the page is mobile-first */
@media (max-width: 768px) {
	.prose {
		font-size: 1rem;
	}
	.prose img {
		max-width: 100%;
	}
}
</style>
