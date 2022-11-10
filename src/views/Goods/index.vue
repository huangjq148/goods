<script>
export default {
  name: "GoodsCreate",
};
</script>
<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { getList, subListItem } from "@/utils/storage";
const value = ref("");
const dataSource = ref(getList("goods"));
const list = ref(dataSource.value);

watch(dataSource, (newValue) => {
  list.value = newValue.filter((item) => item.name.indexOf(value.value) > -1);
});

watch(value, (newValue) => {
  list.value = dataSource.value.filter(
    (item) => item.name.indexOf(newValue) > -1
  );
});

const deleteGoods = (index) => {
  dataSource.value = subListItem("goods", index);
};
</script>

<template>
  <van-nav-bar title="全部商品" />
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <van-list class="goods-list">
    <van-swipe-cell v-for="(item, index) in list" :key="item">
      <van-cell :border="true" :title="item.name">
        进价：{{ item.buyPrice }}
        <br />
        售价：{{ item.sellPrice }}
      </van-cell>
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
  height: calc(100vh - 50px - 100px);
  overflow: scroll;
}
</style>
