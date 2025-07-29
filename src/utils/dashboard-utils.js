import { format } from 'date-fns'

// Helper function to generate random live stats
export const generateLiveStats = (ranges) => {
  return {
    activeUsers5s: Math.floor(Math.random() * (ranges.activeUsers5s.max - ranges.activeUsers5s.min)) + ranges.activeUsers5s.min,
    activeUsers24h: Math.floor(Math.random() * (ranges.activeUsers24h.max - ranges.activeUsers24h.min)) + ranges.activeUsers24h.min,
    cardsCreated24h: Math.floor(Math.random() * (ranges.cardsCreated24h.max - ranges.cardsCreated24h.min)) + ranges.cardsCreated24h.min
  }
}

// Helper function to format current time
export const getCurrentTime = () => {
  return format(new Date(), 'MMM dd, yyyy HH:mm:ss')
}

// Helper function to calculate percentage change
export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 0
  return ((current - previous) / previous * 100).toFixed(1)
}

// Helper function to format currency
export const formatCurrency = (amount) => {
  return `£${amount.toLocaleString()}`
}

// Helper function to create chart data
export const createChartData = (months, marketingData, chartColors) => {
  return {
    visitorsChartData: {
      labels: months,
      datasets: [
        {
          label: 'Unique Visitors',
          data: months.map(month => marketingData[month].uniqueVisitors),
          borderColor: chartColors.visitors,
          backgroundColor: `${chartColors.visitors}1A`,
          tension: 0.4
        },
        {
          label: 'Trial Signups',
          data: months.map(month => marketingData[month].trialSignups),
          borderColor: chartColors.trialSignups,
          backgroundColor: `${chartColors.trialSignups}1A`,
          tension: 0.4
        }
      ]
    },
    revenueChartData: {
      labels: months,
      datasets: [
        {
          label: 'New MRR (£)',
          data: months.map(month => marketingData[month].newMRR),
          borderColor: chartColors.newMRR,
          backgroundColor: `${chartColors.newMRR}1A`,
          tension: 0.4
        },
        {
          label: 'Total MRR (£)',
          data: months.map(month => marketingData[month].totalMRR),
          borderColor: chartColors.totalMRR,
          backgroundColor: `${chartColors.totalMRR}1A`,
          tension: 0.4
        }
      ]
    }
  }
}

// Chart options configuration
export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
} 