<template>
	<div class="flex justify-center items-center">
		<div :class="spinnerClass"></div>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	size: { type: String, default: 'md' }, // sm, md, lg
	color: { type: String, default: 'indigo-600' }
});

const sizeClasses = {
	sm: 'w-6 h-6 border-2',
	md: 'w-10 h-10 border-4',
	lg: 'w-16 h-16 border-4'
};

const spinnerClass = computed(
	() => `
	${sizeClasses[props.size]} 
	border-t-transparent border-${props.color} 
	rounded-full animate-spin
`
);
</script>
