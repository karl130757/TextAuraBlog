<template>
	<section class="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5" v-if="!isLoading">
		<!-- Back to Dashboard Button -->
		<div class="flex items-center mb-6">
			<router-link to="/dashboard" class="text-indigo-600 hover:text-indigo-800 flex items-center">
				<ArrowLeft class="w-5 h-5 mr-2" />
				Back to Dashboard
			</router-link>
		</div>

		<h1 class="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>

		<p class="text-gray-600 mb-6">Edit your post details below. Once you're done, you can save the changes or discard them.</p>

		<form @submit.prevent="updatePost">
			<!-- Title -->
			<label class="block mb-6">
				<span class="text-gray-700 font-medium">Title</span>
				<input
					v-model="title"
					type="text"
					class="w-full border px-4 py-2 rounded-lg mt-1 focus:ring focus:ring-indigo-300"
					placeholder="Enter the title of your post"
					required
				/>
			</label>

			<!-- Content -->
			<label class="block mb-6">
				<span class="text-gray-700 font-medium">Content</span>
				<p class="text-gray-500 text-sm mb-2">Edit the main content of your post using the editor below.</p>
				<div class="rounded-lg">
					<!-- Quill Editor -->
					<quill-editor v-model:content="content" contentType="html" theme="snow" placeholder="Update your content here..."></quill-editor>
				</div>
			</label>

			<!-- Tags -->
			<label class="block mb-6">
				<span class="text-gray-700 font-medium">Tags</span>
				<input
					v-model="tagsInput"
					type="text"
					class="w-full border px-4 py-2 rounded-lg mt-1 focus:ring focus:ring-indigo-300"
					placeholder="Enter tags (separate with commas)"
				/>
				<p class="text-gray-500 text-sm mt-1">Add or update relevant tags to help users find your post.</p>
			</label>

			<!-- Save or Publish Options -->
			<div class="flex flex-col sm:flex-row justify-between items-center mb-6">
				<button
					type="button"
					@click="saveAsDraft"
					class="w-full sm:w-auto px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 ease-in-out mb-4 sm:mb-0 flex items-center justify-center"
				>
					<Save class="w-5 h-5 mr-2" />
					Save as Draft
				</button>

				<button
					type="submit"
					class="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out flex items-center justify-center"
				>
					<Send class="w-5 h-5 mr-2" />
					Save Changes
				</button>
			</div>
		</form>
	</section>

	<section class="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5" v-else>
		<PageLoader :loading="isLoading" />
	</section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePostStore } from '../store/postStore';
import { toast } from 'vue3-toastify';
import PageLoader from '../components/PageLoader.vue';
import { ArrowLeft, Save, Send } from 'lucide-vue-next';

const postStore = usePostStore();

const isLoading = computed(() => postStore.loading);

// Variables to store form data
const title = ref('');
const content = ref('');
const tagsInput = ref('');
const router = useRouter();
const route = useRoute();

// Fetch post data (replace with API call)
const fetchPostData = async (postId) => {
	await postStore.getPostById(postId);
	const post = postStore.post;
	title.value = post.title;
	content.value = post.content;
	tagsInput.value = post.tags.join(',');
};

// Handle form submission to update the post
const updatePost = async () => {
	const postId = route.params.id;
	if (title.value && content.value) {
		const response = await postStore.updatePost({ id: postId, title: title.value, content: content.value, tags: tagsInput.value.split(','), status: 'published' });
		if (response.success) {
			toast.success('Post updated Successfully.');
			setTimeout(() => {
				router.push(`/post/${postId}`);
			}, 1500);
		} else {
			toast.error('Failed to update post!.');
		}
	} else {
		toast.error('Please fill in all fields!');
	}
};

// Save post as draft
const saveAsDraft = async () => {
	const postId = route.params.id;
	if (title.value && content.value) {
		const response = await postStore.updatePost({ id: postId, title: title.value, content: content.value, tags: tagsInput.value.split(','), status: 'draft' });
		if (response.success) {
			toast.success('Post updated Successfully.');
			setTimeout(() => {
				router.push(`/dashboard`);
			}, 1500);
		} else {
			toast.error('Failed to update post!.');
		}
	} else {
		toast.error('Please fill in all fields!');
	}
};

// Fetch post data when the component is mounted
onMounted(() => {
	const postId = route.params.id; // Assuming postId is passed as a route parameter
	fetchPostData(postId);
});
</script>

<style scoped>
/* Add any additional styles as needed */
</style>
