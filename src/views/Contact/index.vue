<script>
export default {
  name: "ContactList",
};
</script>
<script setup>
import { getList, remove } from "@/utils/storage";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { AddressList } from 'vant';

const value = ref("");
const dataSource = ref(getList("persons"));
const router = useRouter()

const showData = computed(() => {
  return dataSource.value.filter(item => item.name.indexOf(value.value) > -1)
})

const deletePerson = (index) => {
  dataSource.value = remove("persons", index);
};

const jumpToEdit = (id) => {
  router.push(`/contact/create?id=${id}`)
}
</script>

<template>
  <van-nav-bar title="全部联系人" />
  <van-search v-model="value" placeholder="请输入搜索关键词" />

  <van-empty description="没有数据" v-if="!showData.length" />
  <div class="van-address-list address-list" v-else>
    <van-list>
      <van-swipe-cell v-for="(item, index) in showData" :key="item">
        <div class="van-address-item address-wrapper">
          <div class="info-wrapper">
            <div class="van-address-item__name">
              {{ item.name }} {{ item.phone }}
            </div>
            <div class="van-address-item__address">
              {{ item.address }}
            </div>
          </div>
          <div class="edit-warpper" @click="() => jumpToEdit(item.id)">
            <van-icon name="edit" />
          </div>
        </div>
        <template #right>
          <van-button @click="() => deletePerson(index)" square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </van-list>
  </div>

  <van-button to="/contact/create" class="add-button" icon="plus" type="primary" />
</template>

<style scoped>
.add-button {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 80px;
  right: 30px;
}

.address-list {
  margin-top: 1px;
  height: calc(100vh - 50px - 100px);
  overflow: auto;
  padding-top: 12px;
  padding-bottom: 12px;
  box-sizing: border-box;
}

.name {
  font-size: 16px;
}

.address-wrapper {
  display: flex;
}

.info-wrapper {
  width: 100%;
}

.edit-warpper {
  display: flex;
  width: 60px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #999;
}
</style>
ƒ
