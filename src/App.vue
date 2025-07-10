<template>
  <div id="app">
    <TopBar />
    <NavBar />
    <router-view />
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<style>
body {
  margin: 0;
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  background: #f5f6fa;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style> 