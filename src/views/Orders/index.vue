<script>
export default {
  name: "OrderList",
};
</script>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import SearchFilter from "@/components/SearchFilter/index.vue"
// import { utils, writeFile } from "xlsx"
import dayjs from "dayjs"
import { queryOrder, changeOrderStatus, deleteOrder } from "@/services/order"

const PAGE_SIZE = 15

const router = useRouter();
const showData = ref([]);
const loading = ref(false);
const finished = ref(false);
const current = ref(1);

const deleteOrderById = async (id) => {
  await deleteOrder(id)
  showData.value = showData.value.filter(item => item.id != id)
};

const changeStatus = async (id, status) => {
  await changeOrderStatus(id, status)
  const data = showData.value.find(item => item.id === id)
  data.status = status
};

const jumpToEdit = (id) => {
  router.push(`/orders/create?id=${id}`)
}

// const jumpToOverview = () => {
//   router.push("/orders/overview")
// }

const handleConditionChange = (values) => {
  showData.value = []
  onLoad(values)
}

const onLoad = async (conditions) => {
  let pageNumber = current.value++
  if (conditions) {
    pageNumber = 1
    current.value = 1
  } else {
    conditions = {}
  }

  const { content } = await queryOrder({ current: pageNumber++, pageSize: PAGE_SIZE, ...conditions })

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

const onExportClick = () => { }

onMounted(() => {
  onLoad({ startCreateDate: dayjs().format("YYYY-MM-DD"), endCreateDate: dayjs().format("YYYY-MM-DD") })
})
</script>

<template>
  <!-- <van-nav-bar title="全部订单" right-text="导出" @click-right="onExportClick" /> -->
  <van-nav-bar title="全部订单" right-text="导出" @click-right="onExportClick" />

  <SearchFilter @conditionChange="handleConditionChange" />

  <van-empty description="没有数据" v-if="!showData.length" />
  <van-list class="order-list" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
    v-else>
    <van-swipe-cell v-for="(item, index) in showData" :key="item.id">
      <van-cell :class="{ completed: item.status === '2' }" :border="true" @click="() => jumpToEdit(item.id)"
        :label="`${item.contact}- ${item.orderTime}`" :title="item.name">
        进价：{{ item.buyPrice * item.number }} 售价：{{
            item.sellPrice * item.number
        }}
        <br />
        利润：{{ item.sellPrice * item.number - item.buyPrice * item.number }}
      </van-cell>

      <template #right>
        <van-button @click="() => deleteOrderById(item.id)" square type="danger" text="删除" />
        <van-button @click="() => changeStatus(item.id, '2')" square type="success" text="完成" />
        <van-button @click="() => changeStatus(item.id, '1')" type="warning" text="未完成" />
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
