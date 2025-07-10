<template>
  <div class="carousel">
    <div class="carousel-wrapper">
      <transition name="zoom-out-fade">
        <img
          :src="images[current]"
          class="carousel-img"
          :alt="`banner${current+1}`"
          :key="images[current]"
        />
      </transition>
    </div>
    <div class="dots">
      <span v-for="(img, idx) in images" :key="idx" :class="['dot', {active: idx === current}]" @click="go(idx)"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const images = [
  new URL('../assets/banner (1).jpg', import.meta.url).href,
  new URL('../assets/banner (2).jpg', import.meta.url).href,
  new URL('../assets/banner (3).jpg', import.meta.url).href,
  new URL('../assets/banner (4).jpg', import.meta.url).href,
  new URL('../assets/banner (5).jpg', import.meta.url).href,
  new URL('../assets/banner (6).jpg', import.meta.url).href
]
const current = ref(0)
let timer: number | undefined

function next() {
  current.value = (current.value + 1) % images.length
}
function prev() {
  current.value = (current.value - 1 + images.length) % images.length
}
function go(idx: number) {
  current.value = idx
}
function startAuto() {
  timer = setInterval(next, 3000)
}
function stopAuto() {
  if (timer) clearInterval(timer)
}
onMounted(startAuto)
onUnmounted(stopAuto)
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  transition: all 1s cubic-bezier(0.33, 1, 0.68, 1);
}
.carousel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
  z-index: 2;
}
.carousel-wrapper {
  position: relative;
}
.carousel-img {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  display: block;
  animation: slowZoom 6s linear infinite alternate;
}
@keyframes slowZoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.3);
  color: #fff;
  border: none;
  font-size: 32px;
  padding: 8px 16px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s;
}
.arrow.left {
  left: 24px;
}
.arrow.right {
  right: 24px;
}
.arrow:hover {
  background: rgba(0,0,0,0.5);
}
.dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80px;
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 1;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s;
  border: 2px solid #fff;
}
.dot.active {
  background: #d32f2f;
  opacity: 1;
  border-color: #d32f2f;
}

.zoom-fade-enter-active {
  animation: zoomFadeIn 0.7s cubic-bezier(0.33, 1, 0.68, 1);
}
@keyframes zoomFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.zoom-fade-leave-active {
  display: none;
}
.zoom-out-fade-leave-active {
  animation: zoomOutFade 0.5s cubic-bezier(0.33, 1, 0.68, 1);
  position: absolute;
  left: 0; top: 0;
  width: 100vw;
  height: 100vh;
}
@keyframes zoomOutFade {
  from {
    opacity: 1;
    transform: scale(1.05);
  }
  to {
    opacity: 0;
    transform: scale(1.3);
  }
}
.zoom-out-fade-enter-active {
  /* 新图片直接出现，继续慢扩张动画 */
}
</style>

<script lang="ts">
export default {}
</script> 