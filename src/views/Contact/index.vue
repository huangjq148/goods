<script>
export default {
  name: "ContactList",
};
</script>
<script setup>
import { watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { queryContact, deleteContact as deleteContactById } from "@/services/contact"

const PAGE_SIZE = 15

const value = ref("");
const router = useRouter();
const showData = ref([]);
const loading = ref(false);
const finished = ref(false);
const current = ref(1);

watch(value, () => {
  showData.value = []
  onLoad({ name: value.value })
})

const deleteContact = async (id) => {
  await deleteContactById(id)
  showData.value = showData.value.filter(item => item.id != id)
};

const jumpToEdit = (id) => {
  router.push(`/contact/create?id=${id}`)
}

const onLoad = async (conditions) => {
  let pageNumber = current.value++
  if (conditions) {
    pageNumber = 1
    current.value = 1
  } else {
    conditions = {}
  }

  const { content } = await queryContact({ current: pageNumber++, pageSize: PAGE_SIZE, ...conditions })

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

onMounted(() => {
  onLoad()
})
</script>

<template>
  <van-nav-bar title="全部联系人" />
  <van-search v-model="value" placeholder="请输入搜索关键词" />

  <van-empty description="没有数据" v-if="!showData.length" />
  <div class="van-address-list address-list" v-else>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
          <van-button @click="() => deleteContact(item.id)" square type="danger" text="删除" />
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
