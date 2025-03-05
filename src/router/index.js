import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import TestApi from '@/components/TestApi.vue';
import UserPortrait from '@/components/UserPortrait.vue';
import BusinessInsights from '@/components/BusinessInsights.vue';
import NearbyShops from '@/components/NearbyShops.vue';
import FriendRecommend from '@/components/FriendRecommend.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/test-api',
        name: 'TestApi',
        component: TestApi,
    },
    {
        path: '/portrait',
        name: 'UserPortrait',
        component: UserPortrait,
    },
    {
        path: '/business',
        name: 'BusinessInsights',
        component: BusinessInsights,
    },
    {
        path: '/nearby',
        name: 'NearbyShops',
        component: NearbyShops,
    },
    {
        path: '/friends',
        name: 'FriendRecommend',
        component: FriendRecommend,
    },
    {
        path: '/',
        redirect: '/portrait',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;