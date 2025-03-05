// src/api/api.js
import axios from 'axios';

const API_URL = '/api'; // 根据你的 Vite 配置，这里使用 /api 作为基础路径

export const initAll = () => {
    return axios.get(`${API_URL}/init_all/`);
};

export const getStatistics = () => {
    return axios.get(`${API_URL}/get_statistics/`);
};

export const listNearbyBusinesses = (latitude, longitude) => {
    return axios.get(`${API_URL}/businesses/nearby/${latitude}/${longitude}/`);
};

export const getBusinessDetails = (businessId) => {
    return axios.get(`${API_URL}/businesses/${businessId}/`);
};

export const sortBusinesses = (sortBy) => {
    return axios.get(`${API_URL}/businesses/sort/?sort_by=${sortBy}`);
};

export const filterBusinesses = (distance, rating, amenities) => {
    return axios.get(`${API_URL}/businesses/filter/?distance=${distance}&rating=${rating}&amenities=${amenities}`);
};

export const getReviewRecommendations = (userId) => {
    return axios.get(`${API_URL}/recommendations/reviews/${userId}/`);
};

export const testApi = () => {
    return axios.get(`${API_URL}/test/`);
};