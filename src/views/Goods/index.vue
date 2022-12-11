<script>
export default {
  name: "GoodsList",
};
</script>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { queryProduct, deleteProduct as deleteGoodsById } from "@/services/product"

const PAGE_SIZE = 15

const value = ref("");
const router = useRouter()
const showData = ref([]);
const loading = ref(false);
const finished = ref(false);
const current = ref(1);

watch(value, () => {
  showData.value = []
  onLoad({ name: value.value })
})

const deleteGoods = async (id) => {
  await deleteGoodsById(id)
  showData.value = showData.value.filter(item => item.id != id)
};

const jumpToEdit = (id) => {
  router.push(`/goods/create?id=${id}`)
}

const onLoad = async (conditions) => {
  let pageNumber = current.value++
  if (conditions) {
    pageNumber = 1
    current.value = 1
  } else {
    conditions = {}
  }

  const { content } = await queryProduct({ current: pageNumber++, pageSize: PAGE_SIZE, ...conditions })

  if (content) {
    showData.value = showData.value.concat(content)
    loading.value = false;

    if (content?.length < 10) {
      finished.value = true
    }
  } else {
    finished.value = true
  }
}

onMounted(() => {
  onLoad()
})
</script>

<template>
  <van-nav-bar title="全部商品" />
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <van-empty description="没有数据" v-if="!showData.length" />
  <van-list class="goods-list" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
    v-else>
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
