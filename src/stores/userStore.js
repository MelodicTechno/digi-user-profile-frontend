// store/userStore.js
import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userInfo: null, // 存储用户信息
    }),
    actions: {
        // 设置用户信息
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
        // 清除用户信息
        clearUserInfo() {
            this.userInfo = null;
        }
    },
    persist: true // 持久化存储
});