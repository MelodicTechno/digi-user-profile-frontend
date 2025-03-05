import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue'; // 确保路径正确

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    // 其他路由
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;