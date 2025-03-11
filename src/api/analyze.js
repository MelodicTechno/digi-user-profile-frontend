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

// 获得评分的数据统计
export const getScoreStatistics = () => {
    return request.get(API_URL+ '/get_score_statistics/');
};

export const updateStatistics = () => {
    return request.get(`${API_URL}/update_statistics/`);
};

// 更新商户数据
export const updateBusinessStatistics = () => {
    return request.get(API_URL + '/update_business_statistics/');
};

// 更新用户数据
export const updateUserStatistics = () => {
    return request.get(API_URL + '/update_user_statistics/');
};

// 更新评分数据
export const updateScoreStatistics = () => {
    return request.get(API_URL + '/update_score_statistics/');
}

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

// 更新评论数据
export const updateReviewStatistics = () => {
    return request.get(API_URL + '/update_review_statistics/');
};

// 获取评论数据统计
export const getReviewStatistics = () => {
    return request.get(API_URL + '/get_review_statistics/');
};

// 更新打卡数据
export const updateCheckinStatistics = () => {
    return request.get(API_URL + '/update_checkin_statistics/');
};

// 获取打卡数据
export const getCheckinStatistics = () => {
    return request.get(API_URL + '/get_checkin_statistics/');
};