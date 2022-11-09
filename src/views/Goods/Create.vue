<script setup>
import { ref, onMounted } from "vue";
import { addList } from "@/utils/storage"
const name = ref("");
const buyPrice = ref("");
const sellPrice = ref("");
const goods = ref([]);

const onClickLeft = () => {
  history.back();
};

const onSubmit = () => {
  addList("goods", { name: name.value, buyPrice: buyPrice.value, sellPrice: sellPrice.value })
  onClickLeft();
};

onMounted(() => {
  const dataStr = localStorage.getItem("goods") ?? "[]";
  goods.value = JSON.parse(dataStr);
});

</script>

<template>
  <van-nav-bar title="新增商品" left-text="返回" left-arrow @click-left="onClickLeft" />
  <van-form @submit="onSubmit" class="form">
    <van-cell-group inset>
      <van-field v-model="name" name="品名" label="品名" placeholder="品名" :rules="[{ required: true, message: '请填写品名' }]" />
      <van-field v-model="buyPrice" name="成本" label="成本" placeholder="成本" type="number"
        :rules="[{ required: true, message: '请填写成本' }]" />
      <van-field v-model="sellPrice" name="售价" label="售价" placeholder="售价"
        :rules="[{ required: true, message: '请填写售价' }]" />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-cell-group>
  </van-form>
</template>

<style>
.form {
  margin-top: 20px;
}
</style>
