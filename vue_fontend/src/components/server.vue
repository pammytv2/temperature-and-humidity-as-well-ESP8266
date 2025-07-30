<template>
  <div class="app-container">
    <div class="dashboard">
      <h1 class="title">🌡️ อุณหภูมิ และความชื้นด้วย ESP8266</h1>
      
      <!-- Error Message -->
      <div v-if="error" class="error-message">
        ⚠️ {{ error }}
      </div>
      
      <div class="sensors-grid">
        <div class="sensor-card">
          <div class="sensor-icon">🌡️</div>
          <div class="sensor-value" :class="{ 'hot': parseFloat(temperature) >= 50 }">
            {{ isLoading ? '⏳' : (temperature || '--') }}{{ temperature ? '°C' : '' }}
          </div>
          <div class="sensor-label">
            <span class="status-indicator" :class="statusClass"></span>
            อุณหภูมิ
          </div>
        </div>
        
        <div class="sensor-card">
          <div class="sensor-icon">💧</div>
          <div class="sensor-value">
            {{ isLoading ? '⏳' : (humidity || '--') }}{{ humidity ? '%' : '' }}
          </div>
          <div class="sensor-label">
            <span class="status-indicator" :class="statusClass"></span>
            ความชื้น
          </div>
        </div>
      </div>

   <div class="chart-container">
  <h3 class="chart-title">📊 Historical Data</h3>
  <SensorChart :readings="chartData" />
</div>


      <div class="controls">
        <button 
          class="btn btn-primary" 
          @click="refreshData"
          :disabled="isLoading"
        >
          {{ isLoading ? '⏳ Loading...' : '🔄 รีเซ็ตข้อมูล' }}
        </button>
        
        <button 
          class="btn btn-secondary" 
          @click="toggleAutoUpdate"
        >
          {{ isAutoUpdateEnabled ? '⏸️ หยุดอัพเดท' : '▶️ เริ่มอัพเดท' }}
        </button>
      </div>

      <div class="last-update">
        <span v-if="lastUpdate">
          📅 วันที่ ล่าสุด: {{ lastUpdate }}
        </span>
        <span v-else>
          ⚠️ ไม่มีข้อมูล
        </span>
      </div>

      <!-- Connection Status -->
      <div class="connection-status">
        <span :class="['connection-dot', statusClass]"></span>
        {{ connectionStatus }}
      </div>
    </div>
  </div>
</template>

<script>
import SensorChart from './SensorChart.vue'


export default {
  name: 'ESP8266Dashboard',
  data() {
    return {
      temperature: '',
      humidity: '',
      chartData: [],
      lastUpdate: '',
      updateInterval: null,
      isLoading: false,
      error: '',
      isAutoUpdateEnabled: true,
      connectionStatus: 'Connecting...',
      // ตั้งค่าฐาน URL ที่นี่ - แก้ไขตาม API ของคุณ
      baseURL: 'http://localhost:3000/api/sensor'
    }
  },
  components: {
    SensorChart
  },
  
  computed: {
    statusClass() {
      if (this.error) return 'status-offline'
      if (this.isLoading) return 'status-connecting'
      return 'status-online'
    }
  },
  methods: {
    async refreshData() {
      try {
        this.isLoading = true
        this.error = ''
        this.connectionStatus = 'Loading...'

        // ใช้ fetch API (ไม่ต้อง import)
        const response = await fetch(this.baseURL)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('API Response:', data)

        if (data && data.length > 0) {
          // เอาข้อมูลล่าสุด (index 0)
          const latest = data[0]
          this.temperature = latest.temperature
          this.humidity = latest.humidity
          this.lastUpdate = new Date(latest.created_at).toLocaleString('th-TH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
          this.connectionStatus = 'เชื่อมต่อสำเร็จ'
          this.chartData = data.map(d => ({
        time: new Date(d.created_at).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        temperature: parseFloat(d.temperature),
        humidity: parseFloat(d.humidity)
      })).reverse()
        } else {
          this.temperature = ''
          this.humidity = ''
          this.lastUpdate = 'ไม่มีข้อมูล'
          this.connectionStatus = 'No Data'
        }


      } catch (err) {
        console.error('ไม่สามารถโหลดข้อมูลจาก API:', err)
        this.error = `เกิดข้อผิดพลาด: ${err.message}`
        this.temperature = ''
        this.humidity = ''
        this.lastUpdate = 'เกิดข้อผิดพลาด'
        this.connectionStatus = 'Connection Failed'
      } finally {
        this.isLoading = false
      }
    },

    startAutoUpdate() {
      if (this.updateInterval) {
        this.stopAutoUpdate()
      }
      
      this.updateInterval = setInterval(() => {
        this.refreshData()
      }, 5000) // อัพเดททุก 5 วินาที
      
      this.isAutoUpdateEnabled = true
      console.log('Auto-update started')
    },

    stopAutoUpdate() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval)
        this.updateInterval = null
      }
      this.isAutoUpdateEnabled = false
      console.log('Auto-update stopped')
    },

    toggleAutoUpdate() {
      if (this.isAutoUpdateEnabled) {
        this.stopAutoUpdate()
      } else {
        this.startAutoUpdate()
      }
    }
  },

  async mounted() {
    // โหลดข้อมูลครั้งแรก
    await this.refreshData()
    
    // เริ่มการอัพเดทอัตโนมัติ
    this.startAutoUpdate()
  },

  beforeUnmount() {
    // ทำความสะอาดเมื่อ component ถูก destroy
    this.stopAutoUpdate()
  }
}
</script>

<style scoped>
.dashboard {
  background: rgba(63, 59, 59, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.title {
  text-align: center;
  color: #ffffff;
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.sensors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.sensor-card {
  background: #7a7a7a;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.sensor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.sensor-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
}

.sensor-value {
  font-size: 3rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.sensor-label {
  font-size: 1.2rem;
  color: #bdbdbd;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-indicator {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  animation: pulse 2s infinite;
}

.status-online {
  background: #4CAF50;
}

.status-offline {
  background: #f44336;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.last-update {
  text-align: center;
  color: #ffffff;
  font-size: 1rem;
  margin-top: 20px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background: linear-gradient(45deg, #f05e5e, #f05e5e);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.btn-secondary {
  background: linear-gradient(45deg, #00ffee, #44A08D);
  box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
}

.chart-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 10px;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
}

.chart-title {
  color: #f8f8f8;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
}

.chart {
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 20px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .sensor-value {
    font-size: 2.5rem;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
  .hot {
  color: #FF5722; /* สีแสด */
  
}


}
</style>  