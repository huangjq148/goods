<script>
export default {
    name: "Me",
};
</script>
<script setup>
import { useUserStore } from "@/stores/user"
import { useRouter } from "vue-router";
import { removeToken } from "@/utils/auth"

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
    removeToken();
    router.push("/login")
}

</script>

<template>
    <van-nav-bar title="我" />

    <van-cell-group inset style="margin-top:10px;">
        <van-cell>
            <div>{{ userStore.user.name }}</div>
        </van-cell>

        <van-cell>
            <van-button type="danger" block @click="logout">退出</van-button>
        </van-cell>
    </van-cell-group>

</template>

<style>

</style>
