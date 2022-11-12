<script>
export default {
    name: "OrderCreate",
};
</script>
<script setup>
import { orderFilterOptions, orderStatusOptions } from "@/data";
import { ref, computed } from "vue";
import { getList } from "@/utils/storage";
import { useToggle } from '@vant/use';
const [showCondition, toggle] = useToggle();

const value = ref("");
const filterKey = ref("goodsName");
const filterOrderStatus = ref("");
const dataSource = ref(getList("orders"));
const options = ref(orderFilterOptions);
const optionsStatus = ref(orderStatusOptions);

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

const onClickRight = () => {
    toggle()
}
</script>

<template>
    <van-sticky offset-top="0">
        <van-nav-bar title="全部订单汇总" left-text="返回" left-arrow @click-left="onClickLeft"
            :right-text="showCondition ? '隐藏条件' : '显示条件'" @click-right="onClickRight" />
        <van-notice-bar class="tips" left-icon="volume-o" text="建议使用横屏查看" />
        <div v-show="showCondition">
            <van-search v-model="value" placeholder="请输入搜索关键词" show-action>
                <template #action>
                    <div @click="jumpToOverview">汇总</div>
                </template>
            </van-search>
            <van-dropdown-menu>
                <van-dropdown-item v-model="filterKey" :options="options" />
                <van-dropdown-item v-model="filterOrderStatus" :options="optionsStatus" />
            </van-dropdown-menu>
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
                    <td>毛利润</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in showData" :key="item.id" :class="{'completed':item.status==='completed'}">
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
    z-index: 10;
}

tbody {
    background-color: #fff;
}

.completed {
  background-color: rgb(212, 255, 204);
}
</style>
