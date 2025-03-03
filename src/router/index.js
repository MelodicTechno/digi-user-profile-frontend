import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from '@/components/Register.vue'; // 确保路径正确

const routes = [
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage,
    },
    // 其他路由
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;