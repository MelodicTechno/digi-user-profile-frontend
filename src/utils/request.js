import axios from "axios";

const instance = axios.create({
    baseURL: '/api', // 使用 Vite 的代理功能
});

// 请求拦截器
instance.interceptors.request.use(
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
instance.interceptors.response.use(
    response => {
        return response.data; // 只返回响应体
    },
    error => {
        alert('服务异常');
        return Promise.reject(error);
    }
);

export default instance;