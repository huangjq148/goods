<script>
export default {
  name: "OrderCreate",
};
</script>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { createOrder, queryOrderById, updateOrder } from "@/services/order"
import { queryProduct } from "@/services/product"
import { queryContact } from "@/services/contact"

const router = useRoute();
const recordId = router.query.id
const currentDate = new Date();
const contactPickerShow = ref(false);
const goodsPickerShow = ref(false);
const calendarShow = ref(false);
const orderInfo = ref({
  orderTime: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1
    }-${currentDate.getDate()}`,
  name: "",
  contact: "",
  address: "",
  buyPrice: "",
  sellPrice: "",
  number: "",
  phone: "",
  remark: "",
  otherCost: ""
});
const goodsList = ref([]);
const contactList = ref([]);

const goodsColumns = computed(() => {
  return goodsList.value.map(item => `${item.name}-${item.buyPrice}-${item.sellPrice}`)
})
const contactColumns = computed(() => {
  return contactList.value.map(item => `${item.name}-${item.address}`)
})

const handleGoodsPick = (value, index) => {
  const goods = goodsList.value[index]

  orderInfo.value.name = goods.name;
  orderInfo.value.buyPrice = goods.buyPrice;
  orderInfo.value.sellPrice = goods.sellPrice;

  goodsPickerShow.value = false;
};

const handleContactPick = (value, index) => {
  const contact = contactList.value[index]

  orderInfo.value.contact = contact.name;
  orderInfo.value.address = contact.address;

  contactPickerShow.value = false;
};

const handleSelectProductClick = async () => {
  const { content } = await queryProduct({ current: 1, pageSize: 3000 })

  goodsList.value = content
  goodsPickerShow.value = true
}

const handleSelectContactClick = async () => {
  const { content } = await queryContact({ current: 1, pageSize: 3000 })

  contactList.value = content
  contactPickerShow.value = true
}

const formatDate = (date) =>
  `${date.getYear() - 100}-${date.getMonth() + 1}-${date.getDate()}`;

const handleDatePick = (value) => {
  calendarShow.value = false;
  orderInfo.value.orderTime = formatDate(value);
};

const onClickLeft = () => {
  history.back();
};

const onSubmit = async () => {
  if (!recordId) {
    await createOrder({
      status: "1",
      stockId: "0",
      ...orderInfo.value,
    })
  } else {
    await updateOrder(orderInfo.value)
  }
  onClickLeft();
};

onMounted(async () => {
  if (recordId) {
    orderInfo.value = await queryOrderById(recordId);
  }
});
</script>

<template>
  <van-nav-bar :title="recordId ? '编辑订单' : '新增订单'" left-text="返回" left-arrow @click-left="onClickLeft" />
  <van-form @submit="onSubmit" class="form">
    <van-cell-group inset>
      <van-cell @click="calendarShow = true" title="日期" :value="orderInfo.orderTime"></van-cell>

      <van-field v-model="orderInfo.name" center clearable label="品名" placeholder="请输入/选择产品" input-align="right"
        :rules="[{ required: true, message: '请输入/选择产品' }]">
        <template #button>
          <van-button size="small" type="primary" @click="handleSelectProductClick">
            选择
          </van-button>
        </template>
      </van-field>

      <van-field v-model="orderInfo.contact" center clearable label="收货人" placeholder="请输入/选择收货人" input-align="right"
        :rules="[{ required: true, message: '请填写收货人' }]">
        <template #button>
          <van-button size="small" type="primary" @click="handleSelectContactClick">
            选择
          </van-button>
        </template>
      </van-field>

      <van-field input-align="right" v-model="orderInfo.address" label="地址" placeholder="收货地址" />

      <van-field input-align="right" v-model="orderInfo.phone" label="手机号" placeholder="手机号" />

      <van-field input-align="right" v-model="orderInfo.buyPrice" label="成本" placeholder="成本" type="number"
        :rules="[{ required: true, message: '请填写成本' }]" />

      <van-field input-align="right" v-model="orderInfo.sellPrice" label="售价" placeholder="售价"
        :rules="[{ required: true, message: '请填写售价' }]" />

      <van-field input-align="right" v-model="orderInfo.number" label="重量" placeholder="重量"
        :rules="[{ required: true, message: '请填写重量' }]" />

      <van-field input-align="right" v-model="orderInfo.otherCost" label="其他费用" placeholder="其他费用" />

      <van-cell title="汇总">
        进价：{{ orderInfo.buyPrice * orderInfo.number }}
        <br />
        售价：{{ orderInfo.sellPrice * orderInfo.number }}
        <br />
        利润：{{
            orderInfo.sellPrice * orderInfo.number -
            orderInfo.buyPrice * orderInfo.number - orderInfo.otherCost
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

  <van-popup v-model:show="contactPickerShow" position="bottom" :style="{ height: '50%' }">
    <van-picker title="收货人" :columns="contactColumns" @confirm="handleContactPick"
      @cancel="contactPickerShow = false" />
  </van-popup>

  <van-calendar v-model:show="calendarShow" @confirm="handleDatePick" />
</template>

<style>
.form {
  margin-top: 20px;
  height: calc(100vh - 70px - 50px);
  overflow: auto;
}
</style>
