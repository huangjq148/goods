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
import { utils, writeFile } from "xlsx"
import dayjs from "dayjs"

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

const addProcessingOrderData = (workbook) => {
  const jsonData = dataSource.value.filter(item => item.status == "processing").map(item => ({
    "id": item.id,
    "date": item.date,
    "goodsName": item.goodsName,
    "number": item.number,
    "remark": item.remark,
    "person": item.person,
    "address": item.address,
    "sellPrice": item.sellPrice,
    "buyPrice": item.buyPrice,
  }))
  const sheetHeader = ["id", "date", "goodsName", "number", "remark", "person", "address", "sellPrice", "buyPrice"]
  const headerDisplay = { id: "订单号", date: "日期", goodsName: "产品", number: "重量（斤）", remark: "特殊要求", person: "收货人", address: "收货地址", sellPrice: "单价", buyPrice: "进价" }
  var sheet = utils.json_to_sheet([headerDisplay, ...jsonData], { skipHeader: true, header: sheetHeader })
  sheet['!cols'] = [{ width: 20 }, { width: 15 }, { width: 20 }, { width: 10 }, { width: 15 }, { width: 15 }, { width: 40 }, { width: 10 }, { width: 10 }];
  utils.book_append_sheet(workbook, sheet, "送货单")
}

const addOrderData = (workbook) => {
  const jsonData = dataSource.value.filter(item => item.status == "completed").map(item => ({
    "id": item.id,
    "date": item.date,
    "goodsName": item.goodsName,
    "number": item.number,
    "sellPrice": item.sellPrice,
    "sellTotal": item.sellPrice * item.number,
    "buyPrice": item.buyPrice,
    "buyTotal": item.buyPrice * item.number,
    "profit": item.sellPrice * item.number - item.buyPrice * item.number
  }))
  const sheetHeader = ["id", "date", "goodsName", "number", "sellPrice", "sellTotal", "buyPrice", "buyTotal", "profit"]
  const headerDisplay = { id: "订单号", date: "日期", goodsName: "产品", number: "重量（斤）", sellPrice: "单价", sellTotal: "实收", buyPrice: "进价", buyTotal: "进价总价", "profit": "毛利润" }
  var sheet = utils.json_to_sheet([headerDisplay, ...jsonData], { skipHeader: true, header: sheetHeader })
  sheet['!cols'] = [{ width: 20 }, { width: 15 }, { width: 20 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }];
  utils.book_append_sheet(workbook, sheet, "收款")
}

const addGoodsData = (workbook) => {
  const jsonData = getList("goods").map(item => ({
    "name": item.name,
    "buyPrice": item.buyPrice,
    "sellPrice": item.sellPrice
  }))

  const sheetHeader = ["name", "buyPrice", "sellPrice"]
  const headerDisplay = { "name": "品名", buyPrice: "成本/1斤", sellPrice: "售价/1斤" }
  var sheet = utils.json_to_sheet([headerDisplay, ...jsonData], { skipHeader: true, header: sheetHeader })
  sheet['!cols'] = [{ width: 10 }, { width: 10 }, { width: 10 }];
  utils.book_append_sheet(workbook, sheet, "产品")
}

const onExportClick = () => {
  var workbook = utils.book_new();

  addProcessingOrderData(workbook)
  addOrderData(workbook)
  addGoodsData(workbook)
  writeFile(workbook, `渔-${dayjs().format('YYYYMMDD')}.xlsx`);
}
</script>

<template>
  <van-nav-bar title="全部订单" right-text="导出" @click-right="onExportClick" />
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
