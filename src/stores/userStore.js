// store/userStore.js
import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    // 定义状态的内容
    state: () => ({
        userInfo: null, // 存储用户信息
    }),
    actions: {
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
    },
}, {
    persist: true // 持久化存储
});