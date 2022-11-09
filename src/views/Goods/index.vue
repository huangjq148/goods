<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
const value = ref("");
const dataSource = ref(JSON.parse(localStorage.getItem("goods") ?? "[]"));
const list = ref(dataSource.value);

watch(value, (newValue) => {
  list.value = dataSource.value.filter(
    (item) => item.name.indexOf(newValue) > -1
  );
});

const deleteGoods = (index) => {
  dataSource.value.splice(index, 1);
  localStorage.setItem("goods", JSON.stringify(dataSource.value));
};
</script>

<template>
  <van-nav-bar title="全部商品" />
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <van-list class="goods-list">
    <van-swipe-cell v-for="(item, index) in list" :key="item">
      <van-cell :border="true" :title="item.name" :value="item.price" />
      <template #right>
        <van-button
          @click="() => deleteGoods(index)"
          square
          type="danger"
          text="删除"
        />
      </template>
    </van-swipe-cell>
  </van-list>
  <RouterLink to="/goods/create">
    <van-button class="add-button" icon="plus" type="primary" />
  </RouterLink>
</template>

<style>
.add-button {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 80px;
  right: 30px;
}

.goods-list {
  margin-top: 1px;
}
</style>
