import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import TestApi from '@/components/TestApi.vue';
import BusinessInsights from '@/components/analyze/BusinessInsights.vue';
import NearbyShops from '@/components/visualize/NearbyShops.vue';
import FriendRecommend from '@/components/analyze/FriendRecommend.vue';
import BusinessVisualize from "@/components/visualize/Business.vue";
import CheckinVisualize from "@/components/visualize/Checkin.vue";
import GeneralVisualize from "@/components/visualize/General.vue";
import ScoreVisualize from "@/components/visualize/Score.vue";
import ReviewVisualize from "@/components/visualize/Review.vue";
import UserVisualize from "@/components/visualize/User.vue";
import LayoutVue from '@/components/LayoutVue.vue'
import UserInfo from "@/components/user/UserInfo.vue";
import BusinessInformation from "@/components/detail/BusinessInformation.vue";
import PersonalShops from "@/components/visualize/PersonalShops.vue";

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/business_info',
        name: 'BusinessInfo',
        component: BusinessInformation,
    },
    {
        path: '/', component: LayoutVue, redirect: '/visualize/business', children: [
            {
                path: '/visualize/business',
                name: 'BusinessVisualize',
                component: BusinessVisualize,
            },
            {
                path: '/visualize/checkin',
                name: 'CheckinVisualize',
                component: CheckinVisualize,
            },
            {
                path: '/visualize/general',
                name: 'GeneralVisualize',
                component: GeneralVisualize,
            },
            {
                path: '/visualize/score',
                name: 'ScoreVisualize',
                component: ScoreVisualize,
            },
            {
                path: '/visualize/review',
                name: 'ReviewVisualize',
                component: ReviewVisualize,
            },
            {
                path: '/visualize/user',
                name: 'UserVisualize',
                component: UserVisualize,
            },
            {

                path: '/test-api',
                name: 'TestApi',
                component: TestApi,
            },
            {
                path: '/business',
                name: 'Business',
                component: BusinessInsights
            },
            {
                path: '/visualize/nearby',
                name: 'NearbyShops',
                component: NearbyShops,
            },
            {
                path: '/friends',
                name: 'FriendRecommend',
                component: FriendRecommend,
            },
            {
                path: '/user_info',
                name: 'UserInfo',
                component: UserInfo,
            },
            {
                path: '/personalization',
                name: 'Personalization',
                component: PersonalShops,
            }
        ]
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;