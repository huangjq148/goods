<script>
export default {
  name: "GoodsCreate",
};
</script>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { createProduct, queryProductById, updateProduct } from "@/services/product"

const router = useRoute();
const recordId = router.query.id
const goodsInfo = ref({
  name: "",
  buyPrice: "",
  sellPrice: "",
});

const onClickLeft = () => {
  history.back();
};

const onSubmit = async () => {
  if (recordId) {
    await updateProduct(goodsInfo.value)
  } else {
    await createProduct(goodsInfo.value)
  }
  onClickLeft();
};

onMounted(async () => {
  if (recordId) {
    goodsInfo.value = await queryProductById(recordId);
  }
});
</script>

<template>
  <van-nav-bar :title="recordId ? '编辑商品' : '新增商品'" left-text="返回" left-arrow @click-left="onClickLeft" />
  <van-form @submit="onSubmit" class="form">
    <van-cell-group inset>
      <van-field v-model="goodsInfo.name" name="品名" label="品名" placeholder="品名"
        :rules="[{ required: true, message: '请填写品名' }]" />
      <van-field v-model="goodsInfo.buyPrice" name="成本" label="成本" placeholder="成本" type="number"
        :rules="[{ required: true, message: '请填写成本' }]" />
      <van-field v-model="goodsInfo.sellPrice" name="售价" label="售价" placeholder="售价"
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
