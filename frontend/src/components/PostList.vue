<template>
	<section class="py-20 bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				<div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all p-6">
					<div class="flex flex-col justify-between h-full">
						<div>
							<h3 class="text-2xl font-semibold mb-4">
								<a :href="'/post/' + post.id" class="hover:text-indigo-600 transition-colors duration-300 ease-in">
									{{ post.title }}
								</a>
							</h3>

							<p class="text-gray-600 mb-4">{{ truncateText(post.excerpt, 100) }}</p>

							<!-- Author and Tags Section -->
							<div class="flex justify-between text-sm text-gray-500 mb-4">
								<span
									>By <strong>{{ post.author }}</strong></span
								>
								<span>{{ new Date(post.createdAt).toLocaleDateString() }}</span>
							</div>

							<!-- Tags -->
							<div class="flex flex-wrap gap-2 mb-4">
								<span v-for="tag in post.tags" :key="tag" class="bg-indigo-100 text-indigo-600 text-xs font-semibold py-1 px-3 rounded-full">
									{{ tag }}
								</span>
							</div>
						</div>

						<!-- Read More Button -->
						<div class="mt-auto">
							<a :href="'/post/' + post.id" class="text-indigo-600 hover:underline text-lg font-medium"> Read More → </a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue';

const posts = ref([
	{
		id: '1',
		title: 'Getting Started with Vue 3',
		excerpt: 'Learn the basics of Vue 3 and how to get started building modern web apps. This guide will take you through step-by-step...',
		author: 'John Doe',
		tags: ['Vue', 'JavaScript', 'Web Development'],
		createdAt: new Date('2025-01-10T14:30:00Z'),
		updatedAt: new Date('2025-01-12T10:15:00Z')
	},
	{
		id: '2',
		title: 'Why Tailwind CSS is Awesome',
		excerpt: 'A dive into Tailwind CSS, a utility-first CSS framework that improves your workflow and allows you to build beautiful UIs faster.',
		author: 'Jane Smith',
		tags: ['CSS', 'Tailwind', 'Web Design'],
		createdAt: new Date('2025-01-08T09:00:00Z'),
		updatedAt: new Date('2025-01-09T16:00:00Z')
	},
	{
		id: '3',
		title: 'How to Build a Blog with Vue 3',
		excerpt: 'Step-by-step tutorial on building a simple blog using Vue 3 and Tailwind CSS. This tutorial covers setting up the project...',
		author: 'Mark Lee',
		tags: ['Vue', 'Tailwind', 'Blogging'],
		createdAt: new Date('2025-01-05T18:30:00Z'),
		updatedAt: new Date('2025-01-06T13:20:00Z')
	},
	{
		id: '3',
		title: 'How to Build a Blog with Vue 3',
		excerpt: 'Step-by-step tutorial on building a simple blog using Vue 3 and Tailwind CSS. This tutorial covers setting up the project...',
		author: 'Mark Lee',
		tags: ['Vue', 'Tailwind', 'Blogging'],
		createdAt: new Date('2025-01-05T18:30:00Z'),
		updatedAt: new Date('2025-01-06T13:20:00Z')
	},
	{
		id: '3',
		title: 'How to Build a Blog with Vue 3',
		excerpt: 'Step-by-step tutorial on building a simple blog using Vue 3 and Tailwind CSS. This tutorial covers setting up the project...',
		author: 'Mark Lee',
		tags: ['Vue', 'Tailwind', 'Blogging'],
		createdAt: new Date('2025-01-05T18:30:00Z'),
		updatedAt: new Date('2025-01-06T13:20:00Z')
	},
	{
		id: '3',
		title: 'How to Build a Blog with Vue 3',
		excerpt: 'Step-by-step tutorial on building a simple blog using Vue 3 and Tailwind CSS. This tutorial covers setting up the project...',
		author: 'Mark Lee',
		tags: ['Vue', 'Tailwind', 'Blogging'],
		createdAt: new Date('2025-01-05T18:30:00Z'),
		updatedAt: new Date('2025-01-06T13:20:00Z')
	}
]);

// Function to truncate text
const truncateText = (text, maxLength) => {
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + '...';
	}
	return text;
};
</script>

<style scoped>
/* Custom Styles for the Post List */
.bg-gray-50 {
	background-color: #f9fafb;
}

.bg-indigo-100 {
	background-color: #ebf4ff;
}

.text-indigo-600 {
	color: #5c6ac4;
}

.text-indigo-500 {
	color: #6366f1;
}

.text-sm {
	font-size: 0.875rem;
}

.font-semibold {
	font-weight: 600;
}

.py-1 {
	padding-top: 0.25rem;
	padding-bottom: 0.25rem;
}

.px-3 {
	padding-left: 0.75rem;
	padding-right: 0.75rem;
}

.rounded-full {
	border-radius: 9999px;
}

.mb-4 {
	margin-bottom: 1rem;
}

.gap-8 {
	gap: 2rem;
}

.hover\:text-indigo-600:hover {
	color: #5c6ac4;
}

.transition-all {
	transition: all 0.3s ease;
}

.shadow-lg {
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.hover\:shadow-2xl:hover {
	box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
}

.text-lg {
	font-size: 1.125rem;
}

.font-medium {
	font-weight: 500;
}
</style>
