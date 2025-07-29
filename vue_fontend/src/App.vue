<template>
  <div id="app">
    <server />
  </div>
</template>

<script>
import server from './components/server.vue'

export default {
  name: 'App',
  components: {
    server
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #121212; /* พื้นหลังสีดำ */
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
  background-color: #121212; /* ✅ พื้นหลังสีดำแนว dark theme */
  min-height: 100vh;         /* ✅ ให้ครอบเต็มจอแนวตั้ง */
  color: #ffffff;            /* ✅ (ถ้าต้องการ) ตั้งสีตัวอักษรเป็นขาว */
}
</style>
