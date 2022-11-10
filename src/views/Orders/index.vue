<script>
export default {
  name: "OrderList",
};
</script>
<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { getList, subListItem, updateItem } from "@/utils/storage";

const value = ref("");
const dataSource = ref(getList("orders"));
const filterKey = ref("goodsName");
const filterOrderStatus = ref("");
const options = ref([
  { text: "根据品名搜索", value: "goodsName" },
  { text: "根据姓名搜索", value: "person" },
  { text: "根据日期搜索", value: "date" },
]);
const optionsStatus = ref([
  { text: "全部", value: "" },
  { text: "已完成", value: "completed" },
  { text: "未完成", value: "processing" },
]);

const showData = computed(() => {
  return dataSource.value
    .filter((item) => item[filterKey.value].indexOf(value.value) > -1)
    .filter((item) => {
      if (!filterOrderStatus.value) {
        return true;
      } else {
        return item.status === filterOrderStatus.value;
      }
    });
});

const deleteGoods = (index) => {
  dataSource.value = subListItem("orders", index);
};

const changeStatus = (index, item, status) => {
  item.status = status;
  dataSource.value = updateItem("orders", index, item);
};
</script>

<template>
  <van-nav-bar title="全部订单" />
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <van-dropdown-menu>
    <van-dropdown-item v-model="filterKey" :options="options" />
    <van-dropdown-item v-model="filterOrderStatus" :options="optionsStatus" />
  </van-dropdown-menu>
  <van-list class="goods-list">
    <van-swipe-cell v-for="(item, index) in showData" :key="item">
      <RouterLink :to="`/orders/create?index=${index}`">
        <van-cell
          :class="{ completed: item.status === 'completed' }"
          :border="true"
          :label="`${item.person}- ${item.date}`"
          :title="item.goodsName"
        >
          进价：{{ item.buyPrice * item.number }} 售价：{{
            item.sellPrice * item.number
          }}
          <br />
          利润：{{ item.sellPrice * item.number - item.buyPrice * item.number }}
        </van-cell>
      </RouterLink>
      <template #right>
        <van-button
          @click="() => deleteGoods(index)"
          square
          type="danger"
          text="删除"
        />
        <van-button
          @click="() => changeStatus(index, item, 'completed')"
          square
          type="warning"
          text="完成"
        />
        <van-button
          @click="() => changeStatus(index, item, 'processing')"
          type="success"
          text="未完成"
        />
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

.completed {
  background-color: rgb(212, 255, 204);
}
</style>
