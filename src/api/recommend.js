// src/api/api.js
import request from '@/utils/request.js';

const API_URL = '/api'; // 根据你的 Vite 配置，这里使用 /api 作为基础路径

export const sendLocationToBackendService = (lat, lng) => {
    return request.get(`${API_URL}/businesses/nearby/${lat}/${lng}/`);
};
