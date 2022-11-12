<script>
export default {
  name: "OrderCreate",
};
</script>
<script setup>
import { ref, onMounted } from "vue";
import { getList, createOrUpdate, getById } from "@/utils/storage";
import { useRoute } from "vue-router";

const router = useRoute();
const recordId = router.query.id
const currentDate = new Date();
const personPickerShow = ref(false);
const goodsPickerShow = ref(false);
const calendarShow = ref(false);
const orderInfo = ref({
  date: `${currentDate.getFullYear()}/${currentDate.getMonth() + 1
    }/${currentDate.getDate()}`,
  goodsName: "请选择产品",
  person: "",
  address: "",
  buyPrice: "",
  sellPrice: "",
  number: "",
  remark: "",
});
const orderList = getList("orders");
const goodsList = getList("goods");
const goodsColumns = goodsList.map(
  (item) => `${item.name}-${item.buyPrice}-${item.sellPrice}`
);
const personList = getList("persons");
const personColumns = personList.map((item) => `${item.name}-${item.address}`);

const handleGoodsPick = (value, index) => {
  orderInfo.value.goodsName = goodsList[index].name;
  orderInfo.value.buyPrice = goodsList[index].buyPrice;
  orderInfo.value.sellPrice = goodsList[index].sellPrice;
  goodsPickerShow.value = false;
};

const handlePersonPick = (value, index) => {
  orderInfo.value.person = personList[index].name;
  orderInfo.value.address = personList[index].address;
  personPickerShow.value = false;
};

const formatDate = (date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

const handleDatePick = (value) => {
  calendarShow.value = false;
  orderInfo.value.date = formatDate(value);
};

const onClickLeft = () => {
  history.back();
};

const onSubmit = () => {
  // create(
  //   "persons",
  //   { name: orderInfo.value.person, address: orderInfo.value.address },
  //   true
  // );
  createOrUpdate("orders", {
    status: "processing",
    ...orderInfo.value,
  })
  onClickLeft();
};

onMounted(() => {
  if (recordId) {
    orderInfo.value = getById('orders', recordId);
  }
});
</script>

<template>
  <van-nav-bar :title="recordId ? '编辑订单' : '新增订单'" left-text="返回" left-arrow @click-left="onClickLeft" />
  <van-form @submit="onSubmit" class="form">
    <van-cell-group inset>
      <van-cell @click="calendarShow = true" title="日期" :value="orderInfo.date"></van-cell>

      <van-cell @click="goodsPickerShow = true" title="品名" :value="orderInfo.goodsName"
        :rules="[{ required: true, message: '请选择产品' }]"></van-cell>

      <van-field v-model="orderInfo.person" center clearable label="收货人" placeholder="请输入/选择收货人" input-align="right"
        :rules="[{ required: true, message: '请填写收货人' }]">
        <template #button>
          <van-button size="small" type="primary" @click="personPickerShow = true">
            选择
          </van-button>
        </template>
      </van-field>

      <van-field input-align="right" v-model="orderInfo.address" name="地址" label="地址" placeholder="收货地址"
        :rules="[{ required: true, message: '请填写地址' }]" />

      <van-field input-align="right" v-model="orderInfo.buyPrice" name="成本" label="成本" placeholder="成本" type="number"
        :rules="[{ required: true, message: '请填写成本' }]" />

      <van-field input-align="right" v-model="orderInfo.sellPrice" name="售价" label="售价" placeholder="售价"
        :rules="[{ required: true, message: '请填写售价' }]" />

      <van-field input-align="right" v-model="orderInfo.number" name="重量" label="重量" placeholder="重量"
        :rules="[{ required: true, message: '请填写重量' }]" />

      <van-cell title="汇总">
        进价：{{ orderInfo.buyPrice * orderInfo.number }}
        <br />
        售价：{{ orderInfo.sellPrice * orderInfo.number }}
        <br />
        利润：{{
            orderInfo.sellPrice * orderInfo.number -
            orderInfo.buyPrice * orderInfo.number
        }}
      </van-cell>

      <van-field input-align="right" v-model="orderInfo.remark" name="备注" label="备注" type="textarea" placeholder="备注"
        rows="1" autosize />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-cell-group>
  </van-form>
  <van-popup v-model:show="goodsPickerShow" position="bottom" :style="{ height: '50%' }">
    <van-picker title="商品" :columns="goodsColumns" @confirm="handleGoodsPick" @cancel="goodsPickerShow = false" />
  </van-popup>

  <van-popup v-model:show="personPickerShow" position="bottom" :style="{ height: '50%' }">
    <van-picker title="收货人" :columns="personColumns" @confirm="handlePersonPick" @cancel="personPickerShow = false" />
  </van-popup>

  <van-calendar v-model:show="calendarShow" @confirm="handleDatePick" />
</template>

<style>
.form {
  margin-top: 20px;
  height: calc(100vh - 70px - 50px);
  overflow: scroll;
}
</style>
