<template></template>
<script setup>
import { toast } from 'vue3-toastify';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
	toast.success('Logout Successful');
	authStore.logout();
	setTimeout(() => {
		router.push('/login');
	}, 1000);
});
</script>
