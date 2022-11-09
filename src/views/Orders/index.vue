<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { getList, subListItem } from "@/utils/storage"

const value = ref("");
const dataSource = ref(getList("orders"));
const list = ref(dataSource.value);
const filterKey = ref("goodsName")
const options = ref([
  { text: '根据品名搜索', value: "goodsName" },
  { text: '根据姓名搜索', value: "person" },
  { text: '根据日期搜索', value: "date" }
])

watch(value, (newValue) => {
  list.value = dataSource.value.filter(
    (item) => item[filterKey.value].indexOf(newValue) > -1
  );
});


watch(dataSource, (newValue) => {
  list.value = newValue.filter(
    (item) => item[filterKey.value].indexOf(value.value) > -1
  );
});

const deleteGoods = (index) => {
  dataSource.value = subListItem("orders", index)
};
</script>

<template>
  <van-nav-bar title="全部订单" />
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <van-dropdown-menu>
    <van-dropdown-item v-model="filterKey" :options="options" />
    <!-- <van-dropdown-item v-model="value2" :options="option2" /> -->
  </van-dropdown-menu>
  <van-list class="goods-list">
    <van-swipe-cell v-for="(item, index) in list" :key="item">
      <van-cell :border="true" :label="`${item.person}- ${item.date}`" :title="item.goodsName">
        进价：{{ item.buyPrice * item.number }}
        售价：{{ item.sellPrice * item.number }}
        <br>
        利润：{{ item.sellPrice * item.number - item.buyPrice * item.number }}
      </van-cell>
      <template #right>
        <van-button @click="() => deleteGoods(index)" square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </van-list>

  <RouterLink to="/orders/create">
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
