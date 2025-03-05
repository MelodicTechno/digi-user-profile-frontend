// src/utils/request.js
import axios from 'axios';

const API_URL = '/api'; // 根据你的 Vite 配置，这里使用 /api 作为基础路径

const request = axios.create({
    baseURL: API_URL,
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 动态设置 Authorization 头
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    response => {
        return response.data; // 只返回响应体
    },
    error => {
        alert('服务异常');
        return Promise.reject(error);
    }
);

export default request;