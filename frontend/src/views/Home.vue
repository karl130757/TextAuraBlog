<template>
	<div>
		<!-- Hero Section -->
		<section class="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16 md:py-24">
			<div class="container mx-auto text-center px-4 md:px-6">
				<h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight leading-tight">Unleash Your Creativity. Share Your Story.</h1>
				<p class="text-base sm:text-lg md:text-xl mb-6 max-w-4xl mx-auto font-light">
					Welcome to the ultimate platform for creative minds. Whether you’re a writer with a passion for storytelling or a reader looking for fresh perspectives, you’ve
					found your home. Here, your words make an impact.
				</p>
				<router-link
					to="/blog"
					class="bg-white text-indigo-800 py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg font-semibold hover:bg-indigo-200 transition-colors duration-300"
				>
					Explore Now
				</router-link>
			</div>
		</section>

		<!-- How It Works -->
		<section class="py-16 bg-gray-100">
			<div class="container mx-auto text-center px-4">
				<h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">How It Works</h2>
				<p class="text-base sm:text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
					It's simple! Our platform is built to make it easy for anyone to start creating, reading, and engaging. Discover how you can get started in just three easy
					steps.
				</p>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					<div class="p-6 bg-white shadow-lg rounded-lg">
						<h3 class="text-xl sm:text-2xl font-semibold mb-4">✍️ Write</h3>
						<p class="text-gray-600 text-sm sm:text-base">
							Ready to share your thoughts with the world? Write and publish your stories effortlessly. Express your creativity through articles, essays, and personal
							reflections.
						</p>
					</div>
					<div class="p-6 bg-white shadow-lg rounded-lg">
						<h3 class="text-xl sm:text-2xl font-semibold mb-4">📖 Read</h3>
						<p class="text-gray-600 text-sm sm:text-base">
							Discover a diverse range of content—from insightful articles to powerful personal stories. Whether you're into tech, lifestyle, or personal growth, we
							have something for everyone.
						</p>
					</div>
					<div class="p-6 bg-white shadow-lg rounded-lg">
						<h3 class="text-xl sm:text-2xl font-semibold mb-4">💬 Connect</h3>
						<p class="text-gray-600 text-sm sm:text-base">
							Engage with fellow readers and writers. Leave comments, start conversations, and share the content that inspires you. Build meaningful connections in a
							supportive community.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Featured Categories -->
		<section class="py-16">
			<div class="container mx-auto text-center px-4">
				<h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Find Your Passion</h2>
				<p class="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
					Whether you’re an aspiring techie, a travel enthusiast, or someone looking for self-improvement, our platform offers a variety of categories to match your
					curiosity. Explore fresh perspectives and spark new ideas with content that excites you.
				</p>
				<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
					<div
						v-for="category in categories"
						:key="category.name"
						class="bg-indigo-100 text-indigo-600 py-4 px-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
					>
						<h3 class="text-sm sm:text-lg font-semibold">{{ category.name }}</h3>
						<p class="text-xs sm:text-sm text-gray-700 mt-1">{{ category.description }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Testimonials Section -->
		<section class="py-16 bg-gray-50">
			<div class="container mx-auto text-center px-4">
				<h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">What Our Community Is Saying</h2>
				<p class="text-base sm:text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
					Don’t just take our word for it! Here’s what our users have to say about their experience on the platform. They’ve found a community of like-minded individuals
					who inspire and support each other every day.
				</p>
				<div class="flex justify-center gap-8">
					<div class="w-full max-w-xs p-6 bg-white shadow-lg rounded-lg">
						<p class="text-gray-600 text-base mb-4">
							"This platform helped me find my voice. Writing here has given me the confidence to express myself freely and share my ideas with the world."
						</p>
						<p class="font-semibold text-gray-800">Emily P.</p>
						<p class="text-gray-500 text-sm">Writer</p>
					</div>
					<div class="w-full max-w-xs p-6 bg-white shadow-lg rounded-lg">
						<p class="text-gray-600 text-base mb-4">
							"Reading new content from diverse perspectives every day has expanded my worldview. It's refreshing to see such engaging and meaningful stories."
						</p>
						<p class="font-semibold text-gray-800">David K.</p>
						<p class="text-gray-500 text-sm">Reader</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Call to Action -->
		<section class="py-16 bg-indigo-600 text-white">
			<div class="container mx-auto text-center px-4">
				<h2 class="text-3xl sm:text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
				<p class="text-base sm:text-lg mb-6">
					Join thousands of creatives, thinkers, and curious minds on a journey of discovery, learning, and growth. Whether you’re here to write, read, or connect,
					there’s a place for you in our community.
				</p>
				<router-link
					to="/signup"
					class="bg-white text-indigo-800 py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg font-semibold hover:bg-indigo-200 transition-colors duration-300"
				>
					Join Us Now
				</router-link>
			</div>
		</section>
	</div>
</template>

<script setup>
import PostList from '../components/PostList.vue';

const categories = [
	{ name: 'Technology', description: 'Explore the latest in tech, AI, and innovation.' },
	{ name: 'Lifestyle', description: 'Discover tips on wellness, productivity, and daily inspiration.' },
	{ name: 'Personal Growth', description: 'Focus on mindset, habits, and achieving your goals.' },
	{ name: 'Finance', description: 'Get insights on money management, investing, and budgeting.' },
	{ name: 'Travel', description: 'Adventure, culture, and guides to the world’s wonders.' },
	{ name: 'Science', description: 'Explore new scientific breakthroughs, space exploration, and more.' }
];
</script>
