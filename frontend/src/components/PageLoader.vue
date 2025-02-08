<template>
	<div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
		<div class="flex flex-col items-center">
			<svg class="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
			</svg>
			<p class="mt-2 text-indigo-600 font-semibold">Loading content...</p>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	loading: {
		type: Boolean,
		required: true
	}
});
</script>
