<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
const active = ref(0);
</script>

<template>
  <RouterView />
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" to="/"> 订单 </van-tabbar-item>
    <van-tabbar-item icon="search" to="/goods"> 商品 </van-tabbar-item>
    <van-tabbar-item icon="search" to="/contact"> 联系人 </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
