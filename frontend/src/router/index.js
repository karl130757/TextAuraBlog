import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import Home from '../views/Home.vue';
import PostDetail from '../views/PostDetail.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import Signup from '../views/Signup.vue';
import DashboardPage from '../views/Dashboard.vue';
import Blog from '../views/Blog.vue';
import CreatePost from '../views/CreatePost.vue';
import EditPost from '../views/EditPost.vue';

const routes = [
	{ path: '/', component: Home },
	{ path: '/blog', component: Blog },
	{ path: '/post/:id', component: PostDetail },
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: DashboardPage,
		meta: { requiresAuth: true }
	},
	{
		path: '/create-post',
		name: 'CreatePost',
		component: CreatePost,
		meta: { requiresAuth: true }
	},
	{
		path: '/edit-post/:id',
		name: 'EditPost',
		component: EditPost,
		meta: { requiresAuth: true }
	},
	{ path: '/about', component: About },
	{ path: '/login', component: Login },
	{ path: '/logout', component: Logout },
	{ path: '/signup', component: Signup }
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	authStore.checkAuth();
	if (to.meta.requiresAuth && !authStore.isAuthenticated) {
		next('/login'); // Redirect unauthenticated users to login
	} else {
		next();
	}
});

export default router;
