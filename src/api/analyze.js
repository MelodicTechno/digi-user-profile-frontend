// src/api/api.js
import request from '@/utils/request';

const API_URL = '/api'; // 根据你的 Vite 配置，这里使用 /api 作为基础路径

export const initAll = () => {
    return request.get(API_URL+ '/init_all/');
};

export const getStatistics = () => {
    return request.get(API_URL+ '/get_statistics/');
};

// 获得商户的数据统计
export const getBusinessStatistics = () => {
    return request.get(API_URL+ '/get_business_statistics/');
};

// 获得用户的数据统计
export const getUserStatistics = () => {
    return request.get(API_URL+ '/get_user_statistics/');
};

export const updateStatistics = () => {
    return request.get(`${API_URL}/update_statistics/`);
};

// 更新用户数据
export const updateUserStatistics = () => {
    return request.get(API_URL + '/update_user_statistics/');
};

export const listNearbyBusinesses = (params) => {
    return request.get(API_URL + '/businesses/nearby/', { params });
};


export const sortBusinesses = (sortBy) => {
    return request.get(API_URL + '/businesses/sort/', { params: { sort_by: sortBy } });
};

export const filterBusinesses = (distance, rating, amenities) => {
    return request.get(API_URL + '/businesses/filter/', { params: { distance, rating, amenities } });
};

export const getReviewRecommendations = (userId) => {
    return request.get(API_URL + `/recommendations/reviews/${userId}/`);
};

export const testApi = () => {
    return request.get(API_URL+ '/for_test/');
};