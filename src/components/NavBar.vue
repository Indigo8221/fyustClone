<template>
  <nav :class="['navbar', { 'scrolled': isScrolled }]">
    <div class="logo">
      <img :src="isScrolled ? logoBlue : logo" alt="logo" />
    </div>
    <ul class="nav-links">
      <li><router-link to="/">学校首页</router-link></li>
      <li><router-link to="/news">新闻动态</router-link></li>
      <li><router-link to="/academy">学院设置</router-link></li>
      <li><router-link to="/about">学校概况</router-link></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const isScrolled = ref(false)
import logo from '../assets/logo.png'
import logoBlue from '../assets/logo_blue.png'
const onScroll = () => {
  isScrolled.value = window.scrollY > 40
}
onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  background: rgba(0,0,0,0); /* 完全透明 */
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  box-sizing: border-box;
  transition: background 0.3s, box-shadow 0.3s, color 0.3s;
}
.navbar .logo {
  width: 214px;
  height: 80px;
  margin-top: 40px;
}
.navbar .logo img {
  max-width: 100%;
}
/* .navbar .logo, */
.navbar .nav-links a {
  color: #fff;
  transition: color 0.3s;
}
.navbar.scrolled {
  background: rgba(255,255,255,0.98);
  color: #222;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  z-index: 10000;
}
.navbar.scrolled .logo,
.navbar.scrolled .nav-links a {
  color: #222;
}
.logo {
  font-size: 22px;
  font-weight: bold;
  color: inherit;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 32px;
  margin: 0;
  padding: 0;
}
.nav-links li {
  font-size: 16px;
}
.nav-links a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}
.nav-links a.router-link-active {
  color: #ffd700;
  font-weight: bold;
}
.nav-links a:hover {
  color: #ffd700;
}
</style> 