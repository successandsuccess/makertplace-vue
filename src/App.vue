<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LineChart from './components/LineChart.vue'
import marketingDataJson from './data/marketing-data.json'
import { 
  generateLiveStats, 
  getCurrentTime, 
  calculatePercentageChange, 
  formatCurrency, 
  createChartData, 
  chartOptions 
} from './utils/dashboard-utils.js'
import './styles/dashboard.css'

const currentTime = ref('')
const liveStats = ref({
  activeUsers5s: 0,
  activeUsers24h: 0,
  cardsCreated24h: 0
})

// Import data from JSON file
const { marketingData, months, chartColors, liveStatsRanges } = marketingDataJson

// Computed properties for current and previous month data
const currentMonthData = ref(marketingData.December)
const previousMonthData = ref(marketingData.November)

// Create chart data using utility function
const { visitorsChartData, revenueChartData } = createChartData(months, marketingData, chartColors)

// Update time and live stats
const updateTime = () => {
  currentTime.value = getCurrentTime()
}

const updateLiveStats = () => {
  liveStats.value = generateLiveStats(liveStatsRanges)
}

let timeInterval
let statsInterval

onMounted(() => {
  updateTime()
  updateLiveStats()
  
  timeInterval = setInterval(updateTime, 1000)
  statsInterval = setInterval(updateLiveStats, 5000)
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
  if (statsInterval) clearInterval(statsInterval)
})
</script>

<template>
  <div id="app">
    <header class="dashboard-header">
      <div class="header-content">
        <h1>Forzeit Marketing Dashboard</h1>
        <div class="last-updated">
          Last updated: {{ currentTime }}
        </div>
      </div>
    </header>

    <main class="dashboard-main">
      <!-- Live Stats Section -->
      <section class="live-stats-section">
        <h2>Live Statistics</h2>
        <div class="stats-grid">
          <div class="col-xs-12 col-sm-6 col-lg-4">
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-content">
                <div class="stat-value">{{ liveStats.activeUsers5s }}</div>
                <div class="stat-label">Active Users (Last 5s)</div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-lg-4">
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <div class="stat-value">{{ liveStats.activeUsers24h }}</div>
                <div class="stat-label">Active Users (Last 24h)</div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-lg-4">
            <div class="stat-card">
              <div class="stat-icon">🎴</div>
              <div class="stat-content">
                <div class="stat-value">{{ liveStats.cardsCreated24h }}</div>
                <div class="stat-label">Cards Created (Last 24h)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Marketing Performance Section -->
      <section class="marketing-section">
        <h2>Marketing Performance Overview</h2>
        <div class="metrics-grid">
          <div class="col-xs-12 col-sm-6 col-lg-4">
            <div class="metric-card">
              <h3>Unique Visitors</h3>
              <div class="metric-value">{{ currentMonthData.uniqueVisitors.toLocaleString() }}</div>
              <div class="metric-change positive">+{{ calculatePercentageChange(currentMonthData.uniqueVisitors, previousMonthData.uniqueVisitors) }}%</div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-lg-4">
            <div class="metric-card">
              <h3>Trial Signups</h3>
              <div class="metric-value">{{ currentMonthData.trialSignups }}</div>
              <div class="metric-change positive">+{{ calculatePercentageChange(currentMonthData.trialSignups, previousMonthData.trialSignups) }}%</div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-lg-4">
            <div class="metric-card">
              <h3>Conversion Rate</h3>
              <div class="metric-value">{{ currentMonthData.conversionRate }}%</div>
              <div class="metric-change positive">+{{ (currentMonthData.conversionRate - previousMonthData.conversionRate).toFixed(2) }}%</div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-lg-4">
            <div class="metric-card">
              <h3>Paid Subscriptions</h3>
              <div class="metric-value">{{ currentMonthData.paidSubscriptions }}</div>
              <div class="metric-change positive">+{{ calculatePercentageChange(currentMonthData.paidSubscriptions, previousMonthData.paidSubscriptions) }}%</div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-lg-4">
            <div class="metric-card">
              <h3>New MRR</h3>
              <div class="metric-value">{{ formatCurrency(currentMonthData.newMRR) }}</div>
              <div class="metric-change positive">+{{ calculatePercentageChange(currentMonthData.newMRR, previousMonthData.newMRR) }}%</div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-lg-4">
            <div class="metric-card">
              <h3>Total MRR</h3>
              <div class="metric-value">{{ formatCurrency(currentMonthData.totalMRR) }}</div>
              <div class="metric-change positive">+{{ calculatePercentageChange(currentMonthData.totalMRR, previousMonthData.totalMRR) }}%</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Charts Section -->
      <section class="charts-section">
        <div class="col-xs-12 col-lg-6">
          <div class="chart-container">
            <h3>Monthly Growth Trends</h3>
            <LineChart :chartData="visitorsChartData" :options="chartOptions" />
          </div>
        </div>
        <div class="col-xs-12 col-lg-6">
          <div class="chart-container">
            <h3>Revenue Growth</h3>
            <LineChart :chartData="revenueChartData" :options="chartOptions" />
          </div>
        </div>
      </section>

      <!-- Detailed Data Table -->
      <section class="table-section">
        <h2>Monthly Performance Data</h2>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th v-for="month in months" :key="month">{{ month }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Unique Visitors</td>
                <td v-for="month in months" :key="month">{{ marketingData[month].uniqueVisitors.toLocaleString() }}</td>
              </tr>
              <tr>
                <td>Trial Signups</td>
                <td v-for="month in months" :key="month">{{ marketingData[month].trialSignups }}</td>
              </tr>
              <tr>
                <td>Conversion Rate (%)</td>
                <td v-for="month in months" :key="month">{{ marketingData[month].conversionRate }}%</td>
              </tr>
              <tr>
                <td>Paid Subscriptions</td>
                <td v-for="month in months" :key="month">{{ marketingData[month].paidSubscriptions }}</td>
              </tr>
              <tr>
                <td>New MRR (£)</td>
                <td v-for="month in months" :key="month">{{ formatCurrency(marketingData[month].newMRR) }}</td>
              </tr>
              <tr>
                <td>Total MRR (£)</td>
                <td v-for="month in months" :key="month">{{ formatCurrency(marketingData[month].totalMRR) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>
