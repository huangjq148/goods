<script>
export default {
    name: "ContactCreate",
};
</script>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { createContact, queryContactById, updateContact } from "@/services/contact"


const router = useRoute();
const recordId = router.query.id
const contactInfo = ref({
    name: "",
    phone: "",
    address: "",
});

const onClickLeft = () => {
    history.back();
};

const onSubmit = async () => {
    if (recordId) {
        await updateContact(contactInfo.value)
    } else {
        await createContact(contactInfo.value)
    }
    onClickLeft();
};

onMounted(async () => {
    if (recordId) {
        contactInfo.value = await queryContactById(recordId);
    }
});
</script>

<template>
    <van-nav-bar :title="recordId ? '编辑联系人' : '新增联系人'" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit" class="form">
        <van-cell-group inset>
            <van-field v-model="contactInfo.name" name="姓名" label="姓名" placeholder="姓名"
                :rules="[{ required: true, message: '请填写姓名' }]" />
            <van-field v-model="contactInfo.phone" name="电话" label="电话" placeholder="电话" type="number"
                :rules="[{ required: true, message: '请填写电话' }]" />
            <van-field v-model="contactInfo.address" name="地址" label="地址" placeholder="地址"
                :rules="[{ required: true, message: '请填写地址' }]" />
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
