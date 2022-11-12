<script>
export default {
  name: "OrderList",
};
</script>
<script setup>
import { orderFilterOptions, orderStatusOptions } from "@/data";
import { getList, remove, update } from "@/utils/storage";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const value = ref("");
const dataSource = ref(getList("orders"));
const filterKey = ref("goodsName");
const filterOrderStatus = ref("");
const options = ref(orderFilterOptions);
const optionsStatus = ref(orderStatusOptions);
const router = useRouter()

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

const deleteGoods = (id) => {
  dataSource.value = remove("orders", id);
};

const changeStatus = (item, status) => {
  item.status = status;
  dataSource.value = update("orders", item);
};

const jumpToEdit = (id) => {
  router.push(`/orders/create?id=${id}`)
}

const jumpToOverview = () => {
  router.push("/orders/overview")
}
</script>

<template>
  <van-nav-bar title="全部订单" />
  <van-search v-model="value" placeholder="请输入搜索关键词" show-action>
    <template #action>
      <div @click="jumpToOverview">汇总</div>
    </template>
  </van-search>
  <van-dropdown-menu>
    <van-dropdown-item v-model="filterKey" :options="options" />
    <van-dropdown-item v-model="filterOrderStatus" :options="optionsStatus" />
  </van-dropdown-menu>
  <van-empty description="没有数据" v-if="!showData.length" />
  <van-list class="order-list" v-else>
    <van-swipe-cell v-for="(item, index) in showData" :key="item">
      <van-cell :class="{ completed: item.status === 'completed' }" :border="true" @click="() => jumpToEdit(item.id)"
        :label="`${item.person}- ${item.date}`" :title="item.goodsName">
        进价：{{ item.buyPrice * item.number }} 售价：{{
            item.sellPrice * item.number
        }}
        <br />
        利润：{{ item.sellPrice * item.number - item.buyPrice * item.number }}
      </van-cell>

      <template #right>
        <van-button @click="() => deleteGoods(item.id)" square type="danger" text="删除" />
        <van-button @click="() => changeStatus(item, 'completed')" square type="success" text="完成" />
        <van-button @click="() => changeStatus(item, 'processing')" type="warning" text="未完成" />
      </template>
    </van-swipe-cell>
  </van-list>

  <van-button to="/orders/create" class="add-button" icon="plus" type="primary" />
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

.order-list {
  margin-top: 1px;
  height: calc(100vh - 46px - 54px - 48px - 50px);
  overflow: auto;
}

.completed {
  background-color: rgb(212, 255, 204);
}
</style>
