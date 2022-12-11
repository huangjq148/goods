
import { ref } from "vue";
import { defineStore } from "pinia";

import { getUserInfo as getUserInfoRequest } from "../services/user"

export const useUserStore = defineStore("user", () => {
    const user = ref({});

    const getUserInfo = async () => {
        const result = await getUserInfoRequest()
        user.value = result
        console.log("获取用户信息", result);
    }

    return { user, getUserInfo };
});
