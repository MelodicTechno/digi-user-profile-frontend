import { defineStore } from "pinia";

export const useBusinessStore = defineStore('businessStore', {
    state: () => ({
        businessId: null, // 存储 business_id
    }),
    actions: {
        // 设置 business_id
        setBusinessId(businessId) {
            this.businessId = businessId;
        },
        // 清除 business_id
        clearBusinessId() {
            this.businessId = null;
        }
    },
    persist: true // 持久化存储
});