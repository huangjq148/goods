<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "../stores/user"
const active = ref(0);
const userStore = useUserStore();

userStore.getUserInfo()
</script>

<template>
    <RouterView />
    <van-tabbar v-model="active">
        <van-tabbar-item icon="orders-o" to="/"> 订单 </van-tabbar-item>
        <van-tabbar-item icon="send-gift-o" to="/goods"> 商品 </van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/contact"> 联系人 </van-tabbar-item>
        <van-tabbar-item icon="user-circle-o" to="/me"> 我 </van-tabbar-item>
    </van-tabbar>
</template>

