import request from "@/utils/request.js";
const API_URL = '/api';
request.defaults.timeout = 3000000;
export const getBusinessdetail = (business_id) => {
    return request.get(`${API_URL}/businesses/${business_id}/`);
};