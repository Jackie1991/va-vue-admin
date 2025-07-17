<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col v-for="item in totalMap" :key="item.value" :span="6" :xs="12">
        <div class="wrapper overflow-hidden clear-both">
          <div class="icon float-left" :class="item.icon">
            <!-- <span class="i-f7-person-2-fill"></span> -->
            <!-- <span :class="item.icon"></span> -->
          </div>
          <h5>{{ item.label }}</h5>
          <p>{{ item.value }}</p>
        </div>
      </el-col>
    </el-row>
    <div class="wrapper">
      <apex-charts type="line" :options="lineOptions" :series="series" />
    </div>
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <div class="wrapper">
          <apex-charts type="radar" :options="radarOptions" :series="series" />
        </div>
      </el-col>
      <el-col :span="8" :xs="24">
        <div class="wrapper">
          <apex-charts type="pie" :options="pieOptions" :series="series[0].data" />
        </div>
      </el-col>
      <el-col :span="8" :xs="24">
        <div class="wrapper">
          <apex-charts type="bar" :options="chartOptions" :series="series" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import ApexCharts from 'vue3-apexcharts'

/* ====== 模拟数据 ====== */
const totalMap = [
  { label: 'New Visits', icon: 'i-f7-person-2-fill', value: '10,245' },
  { label: 'Messages', icon: 'i-f7-bubble-right', value: '8,245' },
  { label: 'Purchases', icon: 'i-f7-bitcoin-circle', value: '1,445' },
  { label: 'Shoppings', icon: 'i-f7-cart', value: '13,650' },
]
const chartOptions = {
  chart: {
    toolbar: false,
  },
  stroke: {
    curve: 'smooth',
  },
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
}
const series = [
  { name: 'expected', data: [30, 40, 60, 55, 83, 62] },
  { name: 'actual', data: [43, 52, 57, 60, 78, 40] },
]
const lineOptions = Object.assign(cloneDeep(chartOptions), {})
const radarOptions = Object.assign(cloneDeep(chartOptions), {
  fill: {
    opacity: 1,
  },
  stroke: {
    show: false,
  },
  markers: {
    size: 0,
  },
})
const pieOptions = Object.assign(cloneDeep(chartOptions), {
  labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'Bananan'],
})
</script>

<style lang="scss" scoped>
.index-container {
  background: none !important;

  .wrapper {
    padding: var(--va-padding);
    border-radius: 10px;
    background-color: white;
    margin-bottom: 20px;

    h5,
    p {
      margin: 0;
      line-height: 1.6;
    }

    h5 {
      color: rgba(0, 0, 0, 0.45);
      font-size: 18px;
    }

    p {
      font-size: 20px;
    }

    .icon {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }

    .vue-apexcharts {
      min-height: 280px !important;
    }
  }

  @for $i from 1 through 4 {
    .el-col:nth-child(#{$i}) .wrapper .icon {
      color: random-color();
    }
  }
}
</style>
