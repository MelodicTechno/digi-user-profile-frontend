// src/api/api.js
import request from '@/utils/request';

const API_URL = '/api'; // 根据你的 Vite 配置，这里使用 /api 作为基础路径

export const initAll = () => {
    return request.get('/init_all/');
};

export const getStatisticsService = () => {
    return request.get('/get_statistics/');
};

export const listNearbyBusinessesService = (params) => {
    return request.get('/businesses/nearby/', { params });
};


export const sortBusinesses = (sortBy) => {
    return request.get('/businesses/sort/', { params: { sort_by: sortBy } });
};

export const filterBusinesses = (distance, rating, amenities) => {
    return request.get('/businesses/filter/', { params: { distance, rating, amenities } });
};

export const getReviewRecommendations = (userId) => {
    return request.get(`/recommendations/reviews/${userId}/`);
};

export const testApi = () => {
    return request.get(API_URL+ '/for_test/');
};