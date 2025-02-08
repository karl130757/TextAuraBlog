<template>
	<div id="app" class="flex min-h-screen bg-gray-50">
		<!-- Sidebar Navigation -->
		<Navbar />
		<!-- Main Content -->
		<div class="flex-1 overflow-y-auto bg-white">
			<router-view />
		</div>
	</div>
</template>

<script setup>
// Import Navbar component here
import Navbar from './components/Navbar.vue';
</script>

<style>
/* Global styles can go here */
</style>
