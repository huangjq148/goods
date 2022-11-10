<script>
export default {
  name: "GoodsCreate",
};
</script>
<script setup>
import { ref, onMounted } from "vue";
import { addList } from "@/utils/storage";
const goodsInfo = ref({
  name: "",
  buyPrice: "",
  sellPrice: "",
});
const goods = ref([]);

const onClickLeft = () => {
  history.back();
};

const onSubmit = () => {
  addList("goods", goodsInfo.value);
  onClickLeft();
};

onMounted(() => {
  const dataStr = localStorage.getItem("goods") ?? "[]";
  goods.value = JSON.parse(dataStr);
});
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
        v-model="goodsInfo.name"
        name="品名"
        label="品名"
        placeholder="品名"
        :rules="[{ required: true, message: '请填写品名' }]"
      />
      <van-field
        v-model="goodsInfo.buyPrice"
        name="成本"
        label="成本"
        placeholder="成本"
        type="number"
        :rules="[{ required: true, message: '请填写成本' }]"
      />
      <van-field
        v-model="goodsInfo.sellPrice"
        name="售价"
        label="售价"
        placeholder="售价"
        :rules="[{ required: true, message: '请填写售价' }]"
      />
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
