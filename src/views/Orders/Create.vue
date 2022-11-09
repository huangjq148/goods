<script setup>
import { ref, onMounted } from "vue";
import { getList, addList } from "@/utils/storage"
const currentDate = new Date()
const date = ref(`${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`);
const goodsName = ref("请选择");
const person = ref("");
const address = ref("");
const buyPrice = ref("");
const sellPrice = ref("");
const number = ref(0);
const remark = ref("");
const personPickerShow = ref(false)
const goodsPickerShow = ref(false)
const calendarShow = ref(false)
const goodsList = getList("goods")
const goodsColumns = goodsList.map(item => `${item.name}-${item.buyPrice}-${item.sellPrice}`)
const personList = getList("persons")
const personColumns = personList.map(item => `${item.name}-${item.address}`)

const handleGoodsPick = (value, index) => {
  goodsName.value = goodsList[index].name
  buyPrice.value = goodsList[index].buyPrice
  sellPrice.value = goodsList[index].sellPrice
  goodsPickerShow.value = false
}

const handlePersonPick = (value, index) => {
  person.value = personList[index].name
  address.value = personList[index].address
  personPickerShow.value = false
}

const formatDate = (date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

const handleDatePick = (value) => {
  calendarShow.value = false;
  date.value = formatDate(value);
}

const onClickLeft = () => {
  history.back();
};

const onSubmit = () => {
  addList("persons", { name: person.value, address: address.value }, true)
  addList("orders", {
    date: date.value,
    goodsName: goodsName.value,
    person: person.value,
    address: address.value,
    buyPrice: buyPrice.value,
    sellPrice: sellPrice.value,
    number: number.value,
    remark: remark.value
  })
  onClickLeft();
};

onMounted(() => {
});

</script>

<template>
  <van-nav-bar title="新增订单" left-text="返回" left-arrow @click-left="onClickLeft" />
  <van-form @submit="onSubmit" class="form">
    <van-cell-group inset>
      <van-cell @click="calendarShow = true" title="日期" :value="date"></van-cell>
      <van-cell @click="goodsPickerShow = true" title="品名" :value="goodsName"></van-cell>

      <van-field v-model="person" center clearable label="收货人" placeholder="请输入/选择收货人">
        <template #button>
          <van-button size="small" type="primary" @click="personPickerShow = true">选择</van-button>
        </template>
      </van-field>

      <van-field input-align="right" v-model="address" name="地址" label="地址" placeholder="收货地址"
        :rules="[{ required: true, message: '请填写地址' }]" />

      <van-field input-align="right" v-model="buyPrice" name="成本" label="成本" placeholder="成本" type="number"
        :rules="[{ required: true, message: '请填写成本' }]" />

      <van-field input-align="right" v-model="sellPrice" name="售价" label="售价" placeholder="售价"
        :rules="[{ required: true, message: '请填写售价' }]" />

      <van-field input-align="right" v-model="number" name="重量" label="重量" placeholder="重量"
        :rules="[{ required: true, message: '请填写重量' }]" />

      <van-cell title="汇总">
        进价：{{ buyPrice * number }}
        <br>
        售价：{{ sellPrice * number }}
        <br>
        利润：{{ sellPrice * number - buyPrice * number }}
      </van-cell>

      <van-field input-align="right" v-model="remark" name="备注" label="备注" type="textarea" placeholder="备注" rows="1"
        autosize />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-cell-group>
  </van-form>
  <van-popup v-model:show="goodsPickerShow" position="bottom" :style="{ height: '50%' }">
    <van-picker title="商品" :columns="goodsColumns" @confirm="handleGoodsPick" @cancel="goodsPickerShow = false"
      @change="onChange" />
  </van-popup>

  <van-popup v-model:show="personPickerShow" position="bottom" :style="{ height: '50%' }">
    <van-picker title="收货人" :columns="personColumns" @confirm="handlePersonPick" @cancel="personPickerShow = false"
      @change="onChange" />
  </van-popup>


  <van-calendar v-model:show="calendarShow" @confirm="handleDatePick" />

</template>

<style>
.form {
  margin-top: 20px;
}
</style>
