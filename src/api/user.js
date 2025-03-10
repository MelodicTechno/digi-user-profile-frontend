import request from '@/utils/request';

const API_URL = '/api';

// 登录
export const login = (userId) => {
    return request.post(`${API_URL}/login/`, { user_id: userId });
};