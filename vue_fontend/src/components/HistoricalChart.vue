<template>
  <div class="chart-container">
    <LineChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

import { ref } from 'vue'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const LineChart = Line

// ตัวอย่างข้อมูล mock ตามกราฟที่แนบมา
const chartData = ref({
  labels: [
    '11:13', '11:15', '11:20', '14:00', '14:10', '14:16',
    '14:20', '14:26', '14:30', '14:35'
  ],
  datasets: [
    {
      label: 'อุณหภูมิ (°C)',
      data: [28, 42, 32, 33, 34, 34, 22, 22, 23, 27],
      borderColor: '#FF6B6B',
      backgroundColor: 'rgba(255, 107, 107, 0.2)',
      tension: 0.4,
      fill: false,
      pointBackgroundColor: '#FF6B6B'
    },
    {
      label: 'ความชื้น (%)',
      data: [70, 45, 75, 70, 68, 68, 40, 40, 40, 40],
      borderColor: '#00E5FF',
      backgroundColor: 'rgba(0, 229, 255, 0.2)',
      tension: 0.4,
      fill: false,
      pointBackgroundColor: '#00E5FF'
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#fff',
        font: {
          weight: 'bold'
        }
      }
    },
    title: {
      display: true,
      text: '📊 Historical Data',
      color: '#fff',
      font: {
        size: 18,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 30
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ccc'
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      }
    },
    y: {
      ticks: {
        color: '#ccc'
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      },
      beginAtZero: true
    }
  }
})
</script>

<style scoped>
.chart-container {
  height: 400px;
  padding: 1rem;
  background-color: #2b2b2b;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
}
</style>
