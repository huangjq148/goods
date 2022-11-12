<script>
export default {
  name: "GoodsList",
};
</script>
<script setup>
import { getList, remove } from "@/utils/storage";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const value = ref("");
const dataSource = ref(getList("goods"));
const router = useRouter()

const showData = computed(() => {
  return dataSource.value.filter(item => item.name.indexOf(value.value) > -1)
})

const deleteGoods = (id) => {
  dataSource.value = remove("goods", id);
};

const jumpToEdit = (id) => {
  router.push(`/goods/create?id=${id}`)
}
</script>

<template>
  <van-nav-bar title="全部商品" />
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <van-empty description="没有数据" v-if="!showData.length" />
  <van-list class="goods-list" v-else>
    <van-swipe-cell v-for="(item, index) in showData" :key="item">
      <van-cell :title="item.name" @click="() => jumpToEdit(item.id)">
        进价：{{ item.buyPrice }}
        售价：{{ item.sellPrice }}
      </van-cell>
      <template #right>
        <van-button @click="() => deleteGoods(item.id)" square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </van-list>
  <van-button to="/goods/create" class="add-button" icon="plus" type="primary" />
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
  overflow: auto;
}
</style>
