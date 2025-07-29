<template>
  <div class="chart-wrapper">
    <Line :data="chartData" :options="options" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

defineProps({
  chartData: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.chart-wrapper {
  height: 400px;
  width: 100%;
}

@media (max-width: 768px) {
  .chart-wrapper {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .chart-wrapper {
    height: 250px;
  }
}

@media (max-width: 360px) {
  .chart-wrapper {
    height: 200px;
  }
}
</style> 