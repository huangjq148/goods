<script setup>
import { ref, onMounted } from "vue";
const name = ref("");
const price = ref("");
const goods = ref([]);
const showKeyboard = ref(false);

const onClickLeft = () => {
  history.back();
};

const onSubmit = () => {
  goods.value.push({ name, price });
  localStorage.setItem("goods", JSON.stringify(goods.value));
  onClickLeft();
};

onMounted(() => {
  const dataStr = localStorage.getItem("goods") ?? "[]";
  goods.value = JSON.parse(dataStr);
  console.log("组件挂载");
});

const onInput = (value) => (price.value += value);

const onDelete = () =>
  (price.value = price.value.slice(0, price.value.length - 1));
</script>

<template>
  <van-nav-bar
    title="新增商品"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit" class="form">
    <van-cell-group inset>
      <van-field
        v-model="name"
        name="商品名"
        label="商品名"
        placeholder="商品名"
        :rules="[{ required: true, message: '请填写商品名' }]"
      />
      <van-field
        v-model="price"
        name="卖价"
        label="卖价"
        placeholder="卖价"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
        :rules="[{ required: true, message: '请填写卖价' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-cell-group>
  </van-form>
  <van-number-keyboard
    :show="showKeyboard"
    theme="custom"
    extra-key="."
    close-button-text="完成"
    @blur="showKeyboard = false"
    @input="onInput"
    @delete="onDelete"
  />
</template>

<style>
.form {
  margin-top: 20px;
}
</style>
