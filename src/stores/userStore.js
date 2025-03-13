// store/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userInfo: {
            userid: null,
            username: null,
            // 你可以在这里添加更多用户信息字段
        },
    }),
    actions: {
        // 设置用户信息
        setUserInfo(userInfo) {
            this.userInfo = {
                ...this.userInfo,
                ...userInfo,
            };
        },
        // 清除用户信息
        clearUserInfo() {
            this.userInfo = {
                userid: null,
                username: null,
                // 重置其他用户信息字段
            };
        }
    },
    persist: {
        enabled: true, // 启用持久化存储
        strategies: [
            {
                key: 'userInfo', // 持久化存储的键名
                storage: localStorage, // 使用 localStorage 进行持久化存储
            },
        ],
    },
});