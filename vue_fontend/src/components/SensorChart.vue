<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script>
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
import { Line } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

export default {
  name: 'SensorChart',
  components: { Line },
  props: {
    readings: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      return {
       labels: this.readings.map(item => item.time),
        datasets: [
          {
            label: 'อุณหภูมิ (°C)',
            data: this.readings.map(item => item.temperature),
            borderColor: '#f05e5e',
            backgroundColor: 'rgba(255, 107, 107, 0.4)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'ความชื้น (%)',
            data: this.readings.map(item => item.humidity),
            borderColor: '#00ffee',
            backgroundColor: 'rgba(78, 205, 196, 0.3)',
            fill: true,
            tension: 0.4
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  }
}
</script>
