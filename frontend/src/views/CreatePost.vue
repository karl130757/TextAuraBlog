<template>
	<section class="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5" v-if="!isLoading">
		<!-- Back to Dashboard Button -->
		<div class="flex items-center mb-6">
			<router-link to="/dashboard" class="text-indigo-600 hover:text-indigo-800 flex items-center">
				<ArrowLeft class="w-5 h-5 mr-2" />
				Back to Dashboard
			</router-link>
		</div>

		<h1 class="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>

		<p class="text-gray-600 mb-6">Create a new blog post. Fill in the details below and either publish or save your post as a draft for later editing.</p>

		<form @submit.prevent="createPost">
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
				<p class="text-gray-500 text-sm mb-2">Write the main content of your post using the editor below. You can format text, and more.</p>
				<div class="rounded-lg">
					<!-- Quill Editor -->
					<quill-editor v-model:content="content" contentType="html" theme="snow" placeholder="Start typing your content here..."></quill-editor>
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
				<p class="text-gray-500 text-sm mt-1">Add relevant tags to help users find your post.</p>
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
					Publish
				</button>
			</div>
		</form>
	</section>

	<section class="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5" v-else>
		<PageLoader :loading="isLoading" />
	</section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { usePostStore } from '../store/postStore';
import { toast } from 'vue3-toastify';
import PageLoader from '../components/PageLoader.vue';
import { ArrowLeft, Save, Send } from 'lucide-vue-next';

const postStore = usePostStore();

// Variables to store form data
const title = ref('');
const content = ref('');
const tagsInput = ref('');
const router = useRouter();

const isLoading = computed(() => postStore.loading);

// Handle form submission to save the post
const createPost = async () => {
	if (title.value && content.value) {
		const response = await postStore.createPost({ title: title.value, content: content.value, tags: tagsInput.value.split(','), status: 'published' });
		if (response.success) {
			toast.success('Post created Successfully.');
			setTimeout(() => {
				router.push('/dashboard');
			}, 1500);
		} else {
			toast.error('Failed to create post!.');
		}
	} else {
		toast.erro('Please fill in all fields!');
	}
};

// Save post as draft
const saveAsDraft = async () => {
	if (title.value && content.value) {
		const response = await postStore.createPost({ title: title.value, content: content.value, tags: tagsInput.value.split(','), status: 'draft' });
		if (response.success) {
			toast.success('Post was saved as draft.');
			setTimeout(() => {
				router.push('/dashboard');
			}, 2000);
		} else {
			toast.error('Failed to create draft for the requested content.');
		}
	} else {
		toast.erro('Please fill in all fields!');
	}
};
</script>

<style scoped>
/* Add any additional styles as needed */
</style>
