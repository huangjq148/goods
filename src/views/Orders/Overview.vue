<script>
export default {
    name: "OrderCreate",
};
</script>
<script setup>
import { ref, computed, onMounted } from "vue";
import { getList } from "@/utils/storage";

const value = ref("");
const filterKey = ref("goodsName");
const filterOrderStatus = ref("");
const dataSource = ref(getList("orders"));
const notifyShow = ref(true)

const showData = computed(() => {
    return dataSource.value
        .filter((item) => item[filterKey.value].indexOf(value.value) > -1)
        .filter((item) => {
            if (!filterOrderStatus.value) {
                return true;
            } else {
                return item.status === filterOrderStatus.value;
            }
        });
});

const onClickLeft = () => {
    history.back();
};

</script>

<template>
    <van-nav-bar title="全部订单汇总" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-notice-bar class="tips" left-icon="volume-o" text="建议使用横屏查看" />
    <div class="tableWrapper">
        <table class="overview-table" border="1px" border-spacing="0">
            <thead>
                <tr>
                    <td>订单号</td>
                    <td>日期</td>
                    <td>产品</td>
                    <td>重量</td>
                    <td>收货人</td>
                    <td>单价</td>
                    <td>实收</td>
                    <td>进价</td>
                    <td>进价总额</td>
                    <td>毛利润</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in showData" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.goodsName }}</td>
                    <td>{{ item.number }}</td>
                    <td>{{ item.person }}</td>
                    <td>{{ item.sellPrice }}</td>
                    <td>{{ item.sellPrice * item.number }}</td>
                    <td>{{ item.buyPrice }}</td>
                    <td>{{ item.buyPrice * item.number }}</td>
                    <td>{{ item.sellPrice * item.number - item.buyPrice * item.number }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<style>
@media (orientation: portrait) {
    .tips {
        display: fles;
    }
}

@media (orientation: landscape) {
    .tips {
        display: none !important;
    }
}

.tableWrapper {
    width: calc(100% - 10px);
    margin: 5px;
    overflow: auto;
}

.overview-table {
    min-width: 100%;
    border-collapse: collapse;
    border-color: #e3e3e3;
}

.overview-table tr td {
    padding: 8px 4px;
}

thead {
    background-color: #bbb;
}

tbody {
    background-color: #fff;
}
</style>
