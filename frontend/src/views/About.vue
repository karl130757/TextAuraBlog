<template>
	<div class="min-h-screen bg-gray-100 py-12 px-6">
		<div class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-10">
			<div class="text-center mb-8">
				<h1 class="text-4xl font-semibold text-gray-800">About TextAura</h1>
				<p class="text-lg text-gray-600 mt-2">A collaborative platform for writers, readers, and thinkers.</p>
			</div>

			<!-- What is TextAura? -->
			<div class="flex items-start space-x-6">
				<LucideBookOpen class="w-12 h-12 text-indigo-600" />
				<div>
					<h3 class="text-2xl font-semibold text-gray-800">What is TextAura?</h3>
					<p class="text-gray-600 mt-2">
						TextAura is a community-driven blogging platform designed to connect writers, readers, and creatives. It allows users to share stories, articles, and
						insights on various topics, from technology to lifestyle.
					</p>
					<p class="text-gray-600 mt-2">Whether you're a seasoned writer or a beginner, TextAura gives you the space to create, engage, and grow your audience.</p>
				</div>
			</div>

			<!-- Our Mission -->
			<div class="flex items-start space-x-6">
				<LucideTarget class="w-12 h-12 text-indigo-600" />
				<div>
					<h3 class="text-2xl font-semibold text-gray-800">Our Mission</h3>
					<p class="text-gray-600 mt-2">
						Our mission is to empower individuals to share their voices and ideas with the world. We believe in the power of storytelling and collaboration to foster
						knowledge, spark creativity, and build communities.
					</p>
					<p class="text-gray-600 mt-2">
						At TextAura, we aim to make writing accessible, fun, and rewarding for everyone. Our platform supports a wide variety of topics, allowing contributors to
						share their expertise, experiences, and creativity.
					</p>
				</div>
			</div>

			<!-- Key Features -->
			<div class="flex flex-col items-start space-y-6">
				<div class="flex items-start space-x-6">
					<LucideUsers class="w-12 h-12 text-indigo-600" />
					<div>
						<h3 class="text-2xl font-semibold text-gray-800">Collaborative Platform</h3>
						<p class="text-gray-600 mt-2">
							TextAura is designed with collaboration in mind. Writers can connect with like-minded individuals, editors can review and enhance content, and readers
							can share their thoughts, creating an inclusive space for creativity and feedback.
						</p>
					</div>
				</div>

				<div class="flex items-start space-x-6">
					<LucideTag class="w-12 h-12 text-indigo-600" />
					<div>
						<h3 class="text-2xl font-semibold text-gray-800">Diverse Topics</h3>
						<p class="text-gray-600 mt-2">
							From technology and health to personal stories and lifestyle, TextAura offers a variety of categories to explore. Whether you're passionate about a
							niche subject or looking to share your life experiences, TextAura has the space for you.
						</p>
					</div>
				</div>

				<div class="flex items-start space-x-6">
					<LucideLayout class="w-12 h-12 text-indigo-600" />
					<div>
						<h3 class="text-2xl font-semibold text-gray-800">User-Friendly Interface</h3>
						<p class="text-gray-600 mt-2">
							Our platform is built for both novice and experienced writers. The user interface is designed to be intuitive and easy to navigate, allowing you to
							focus on creating content without distractions.
						</p>
					</div>
				</div>
			</div>

			<!-- Get Involved -->
			<div class="text-center mt-8">
				<h3 class="text-2xl font-semibold text-gray-800">Get Involved with TextAura</h3>
				<p class="text-lg text-gray-600 mt-2">
					Join us as a writer, editor, or reader! Whether you're here to share your knowledge or explore new ideas, TextAura is a place for everyone.
				</p>
				<router-link to="/signup" class="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-200"
					>Get Started</router-link
				>
			</div>
		</div>
	</div>
</template>

<script setup>
// Import Lucide icons
import { LucideBookOpen, LucideTarget, LucideUsers, LucideTag, LucideLayout } from 'lucide-vue-next';
</script>

<style scoped>
/* Scoped styles to enhance the look */
.bg-gray-100 {
	background-color: #f7fafc;
}

.bg-white {
	background-color: white;
}

.text-indigo-600 {
	color: #5c6ac4;
}
</style>
