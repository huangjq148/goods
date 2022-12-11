<script setup>
import { orderFilterOptions, orderStatusOptions } from "@/data";
import { watch, ref, defineEmits, computed } from "vue"
import dayjs from "dayjs"
import { useRouter } from "vue-router";

const router = useRouter();
const filterOrderStatus = ref("");
const options = ref(orderFilterOptions);
const optionsStatus = ref(orderStatusOptions);
const filterOptionsShow = ref(false)
const value = ref("");
const filterKey = ref("name");
const emits = defineEmits(['conditionChange']);
const orderTimeRange = ref([dayjs().format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
const calendarShow = ref(false)

const conditions = computed(() => {
    const tmp = {}

    if (orderTimeRange.value.length) {
        tmp.startCreateDate = orderTimeRange.value[0]
        tmp.endCreateDate = orderTimeRange.value[1]
    }

    if (value.value) {
        tmp[filterKey.value] = value.value
    }

    if (filterOrderStatus.value) {
        tmp.status = filterOrderStatus.value
    }

    return tmp
})

watch(conditions, (newValue) => {
    emits("conditionChange", newValue)
})

const jumpToOverview = () => {
    router.push("/orders/overview")
}

const onCalendarConfirm = (values) => {
    orderTimeRange.value = [dayjs(values[0]).format("YYYY-MM-DD"), dayjs(values[1]).format("YYYY-MM-DD")]

    calendarShow.value = false
}
</script>

<template>
    <van-search v-model="value" placeholder="请输入搜索关键词" show-action>
        <template #action>
            <div @click="jumpToOverview">汇总</div>
        </template>
    </van-search>
    <div class="filter-wrapper">
        <van-dropdown-menu>
            <van-dropdown-item v-model="filterKey" :options="options" />
            <van-dropdown-item v-model="filterOrderStatus" :options="optionsStatus" />
        </van-dropdown-menu>
        <van-button class="filter-wrapper-action" @click="filterOptionsShow = true">
            <van-icon name="filter-o" />
        </van-button>
    </div>
    <van-popup v-model:show="filterOptionsShow" position="bottom" :style="{ height: '40%' }">
        <van-cell-group>
            <van-cell title="时间范围" :value="orderTimeRange[0] + '-' + orderTimeRange[1]"
                @click="calendarShow = true"></van-cell>
        </van-cell-group>
    </van-popup>

    <van-calendar v-model:show="calendarShow" :min-date="new Date(2022, 6, 1)" type="range"
        @confirm="onCalendarConfirm" />
</template>

<style>
.filter-wrapper {
    display: flex;
}

.filter-wrapper-action {
    height: 48px;
    line-height: 48px;
    width: 48px;
    background-color: white;
}

.van-dropdown-menu {
    width: 100%;
}
</style>