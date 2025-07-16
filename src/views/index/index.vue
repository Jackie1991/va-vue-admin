<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="12">
        <div class="wrapper">
          <h5>New Visits</h5>
          <p>10,245</p>
        </div>
      </el-col>
      <el-col :span="6" :xs="12">
        <div class="wrapper">
          <h5>Messages</h5>
          <p>8,245</p>
        </div>
      </el-col>
      <el-col :span="6" :xs="12">
        <div class="wrapper">
          <h5>Purchases</h5>
          <p>1,445</p>
        </div>
      </el-col>
      <el-col :span="6" :xs="12">
        <div class="wrapper">
          <h5>Shoppings</h5>
          <p>13,650</p>
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

    .vue-apexcharts {
      min-height: 280px !important;
    }
  }
}
</style>
