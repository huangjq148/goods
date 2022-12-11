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
// import dayjs from "dayjs"
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

const jumpToOverview = () => {
  router.push("/orders/overview")
}

// const addProcessingOrderData = (workbook) => {
//   const jsonData = dataSource.value.filter(item => item.status == "processing").map(item => ({
//     "id": item.id,
//     "date": item.date,
//     "goodsName": item.goodsName,
//     "number": item.number,
//     "remark": item.remark,
//     "contact": item.contact,
//     "address": item.address,
//     "sellPrice": item.sellPrice,
//     "buyPrice": item.buyPrice,
//   }))
//   const sheetHeader = ["id", "date", "goodsName", "number", "remark", "contact", "address", "sellPrice", "buyPrice"]
//   const headerDisplay = { id: "订单号", date: "日期", goodsName: "产品", number: "重量（斤）", remark: "特殊要求", contact: "收货人", address: "收货地址", sellPrice: "单价", buyPrice: "进价" }
//   var sheet = utils.json_to_sheet([headerDisplay, ...jsonData], { skipHeader: true, header: sheetHeader })
//   sheet['!cols'] = [{ width: 20 }, { width: 15 }, { width: 20 }, { width: 10 }, { width: 15 }, { width: 15 }, { width: 40 }, { width: 10 }, { width: 10 }];
//   utils.book_append_sheet(workbook, sheet, "送货单")
// }

// const addOrderData = (workbook) => {
//   const jsonData = dataSource.value.filter(item => item.status == "completed").map(item => ({
//     "id": item.id,
//     "date": item.date,
//     "goodsName": item.goodsName,
//     "number": item.number,
//     "sellPrice": item.sellPrice,
//     "sellTotal": item.sellPrice * item.number,
//     "buyPrice": item.buyPrice,
//     "buyTotal": item.buyPrice * item.number,
//     "profit": item.sellPrice * item.number - item.buyPrice * item.number
//   }))
//   const sheetHeader = ["id", "date", "goodsName", "number", "sellPrice", "sellTotal", "buyPrice", "buyTotal", "profit"]
//   const headerDisplay = { id: "订单号", date: "日期", goodsName: "产品", number: "重量（斤）", sellPrice: "单价", sellTotal: "实收", buyPrice: "进价", buyTotal: "进价总价", "profit": "毛利润" }
//   var sheet = utils.json_to_sheet([headerDisplay, ...jsonData], { skipHeader: true, header: sheetHeader })
//   sheet['!cols'] = [{ width: 20 }, { width: 15 }, { width: 20 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }];
//   utils.book_append_sheet(workbook, sheet, "收款")
// }

// const addGoodsData = (workbook) => {
//   const jsonData = getList("goods").map(item => ({
//     "name": item.name,
//     "buyPrice": item.buyPrice,
//     "sellPrice": item.sellPrice
//   }))

//   const sheetHeader = ["name", "buyPrice", "sellPrice"]
//   const headerDisplay = { "name": "品名", buyPrice: "成本/1斤", sellPrice: "售价/1斤" }
//   var sheet = utils.json_to_sheet([headerDisplay, ...jsonData], { skipHeader: true, header: sheetHeader })
//   sheet['!cols'] = [{ width: 10 }, { width: 10 }, { width: 10 }];
//   utils.book_append_sheet(workbook, sheet, "产品")
// }

// const onExportClick = () => {
//   var workbook = utils.book_new();

//   addProcessingOrderData(workbook)
//   addOrderData(workbook)
//   addGoodsData(workbook)
//   writeFile(workbook, `渔-${dayjs().format('YYYYMMDD')}.xlsx`);
// }

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
  onLoad()
})
</script>

<template>
  <!-- <van-nav-bar title="全部订单" right-text="导出" @click-right="onExportClick" /> -->
  <van-nav-bar title="全部订单" right-text="导出" @click-right="onExportClick" />

  <SearchFilter />

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
