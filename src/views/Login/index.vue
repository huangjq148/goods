<template>
    <van-form @submit="onSubmit">
        <div class="login-header">登陆</div>
        <van-cell-group inset>
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup>
import { ref } from 'vue';
import { login } from "../../services/user"
import { setToken } from "../../utils/auth"
import { useRouter } from 'vue-router'

const $router = useRouter()
const username = ref('');
const password = ref('');

const onSubmit = async (values) => {
    const result = await login(values)

    setToken({ access_token: result.access_token })
    $router.push("/")

};
</script>

<style>
.login-header {
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
    font-weight: 400;
}
</style>