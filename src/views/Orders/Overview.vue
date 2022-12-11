<script>
export default {
    name: "OrderCreate",
};
</script>
<script setup>
import { ref, onMounted } from "vue";
import { useToggle } from '@vant/use';
import SearchFilter from "@/components/SearchFilter/index.vue"
import { queryOrder } from "@/services/order"
import dayjs from "dayjs"

const [showCondition, toggle] = useToggle();
const showData = ref([]);

const handleConditionChange = (values) => {
    loadData(values)
}

const onClickLeft = () => {
    history.back();
};

const onClickRight = () => {
    toggle()
}

const loadData = async (conditions = {}) => {
    const { content } = await queryOrder({
        current: 1,
        pageSize: 1000,
        ...conditions
    })
    showData.value = content ?? []
}

onMounted(() => {
    loadData({ startCreateDate: dayjs().format("YYYY-MM-DD"), endCreateDate: dayjs().format("YYYY-MM-DD") });
})
</script>

<template>
    <van-sticky offset-top="0">
        <van-nav-bar title="全部订单汇总" left-text="返回" left-arrow @click-left="onClickLeft"
            :right-text="showCondition ? '隐藏条件' : '显示条件'" @click-right="onClickRight" />
        <van-notice-bar class="tips" left-icon="volume-o" text="建议使用横屏查看" />
        <div v-show="showCondition">
            <SearchFilter @conditionChange="handleConditionChange" />
        </div>
    </van-sticky>
    <van-empty description="没有数据" v-if="!showData.length" />
    <div class="tableWrapper" v-else :style="{
        height: showCondition ? 'calc(100vh - 54px - 50px - 54px - 50px)' : 'calc(100vh - 54px - 50px)'
    }">
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
                    <td>其他费用</td>
                    <td>毛利润</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in showData" :key="item.id" :class="{ 'completed': item.status === '2' }">
                    <td>{{ item.id }}</td>
                    <td>{{ item.orderTime }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.number }}</td>
                    <td>{{ item.contact }}</td>
                    <td>{{ item.sellPrice }}</td>
                    <td>{{ item.sellPrice * item.number }}</td>
                    <td>{{ item.buyPrice }}</td>
                    <td>{{ item.buyPrice * item.number }}</td>
                    <td>{{ item.otherCost }}</td>
                    <td>{{ item.sellPrice * item.number - item.buyPrice * item.number - item.otherCost }}</td>
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
    height: calc(100vh - 50px);
    position: relative;
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
    position: sticky;
    top: 0;
    width: 100vw;
    z-index: 1;
}

tbody {
    background-color: #fff;
}

.completed {
    background-color: rgb(212, 255, 204);
}
</style>
