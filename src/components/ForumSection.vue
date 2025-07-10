<template>
  <div class="forum-section" ref="sectionRef">
    <div class="forum-header">
      <div class="forum-title-area">
        <span class="forum-en">FORUM</span>
        <span class="forum-zh" :class="animClass" ref="zhRef">———— 讲座论坛</span>
      </div>
      <button class="forum-more-btn" :class="btnAnimClass" ref="btnRef">查看更多 &gt;</button>
    </div>
    <div class="carousel-wrapper no-shadow">
      <div class="carousel-list horizontal-scroll" ref="imgScrollRef">
        <div v-for="(card, idx) in forumCards" :key="card.id" class="forum-card" :ref="el => cardRefs[idx] = el" :class="cardAnimArr[idx]">
          <div class="forum-card-img-wrap">
            <img :src="card.img" :alt="card.title" />
            <div class="img-mask"></div>
            <div class="img-gradient-mask"></div>
          </div>
          <div class="forum-card-content">
            <div class="forum-card-title">{{ card.title }}</div>
            <div class="forum-card-meta">主讲人：{{ card.speaker }}</div>
            <div class="forum-card-meta">时间：{{ card.time }}</div>
            <div class="forum-card-meta">地点：{{ card.place }}</div>
            <button class="forum-card-btn"> <span>➔</span> </button>
          </div>
        </div>
      </div>
    </div>
    <!-- indicator-bar 相关内容已全部删除 -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import forum01 from '../assets/forum01.jpg'
import forum02 from '../assets/forum02.jpg'
import forum03 from '../assets/forum03.jpg'
import forum04 from '../assets/forum04.jpg'
import forum05 from '../assets/forum05.jpg'
import forum06 from '../assets/forum06jpg.jpg'
import forum07 from '../assets/forum07.jpg'

const images = [forum01, forum02, forum03, forum04, forum05, forum06, forum07]
const cardsPerView = 4

// 随机生成讲座卡片数据
function randomTitle() {
  const arr = [
    'Multicomponent HighEntropy Cantor Alloys',
    '量子科学前沿讲座：踏入神奇世界——超导现象的奥秘',
    '钠离子电池聚阴离子型正极材料结构及界面调控',
    '上海交通大学讲席教授Tudor Stefan RATIU应邀做题为《Liquid crystal models》的学术报告',
    'Cooperative Motion, and Johari-Goldstein b-Relaxation in a Metallic Glass-Forming Material',
    'Multiscale Interfaces Design in Solids - Improve Mechanical...'
  ]
  return arr[Math.floor(Math.random()*arr.length)]
}
function randomSpeaker() {
  const arr = ['王健教授', '张豪博士', 'Tudor Ratiu院士', '林海青院士', '李煜旭博士', 'Brian Cantor教授']
  return arr[Math.floor(Math.random()*arr.length)]
}
function randomTime() {
  const arr = [
    '2025年4月22日15:00',
    '2025年3月28日上午10:00',
    '2025年3月12日 8:30-10:00',
    '2024年12月25日上午10:40',
    '2024年12月15日16:00-16:35',
    '2025年2月28日15：00'
  ]
  return arr[Math.floor(Math.random()*arr.length)]
}
function randomPlace() {
  const arr = [
    '屏山楼104学术报告厅',
    '行政楼302',
    '旗山楼2号楼101',
    '旗山楼三层4-321教室'
  ]
  return arr[Math.floor(Math.random()*arr.length)]
}
const forumCards = Array.from({length: 10}).map((_, i) => ({
  id: i,
  img: images[i % images.length],
  title: randomTitle(),
  speaker: randomSpeaker(),
  time: randomTime(),
  place: randomPlace()
}))
const currentIndex = ref(0)
const maxIndex = computed(() => Math.max(0, forumCards.length - cardsPerView))
const prev = () => { if (currentIndex.value > 0) currentIndex.value-- }
const next = () => { if (currentIndex.value < maxIndex.value) currentIndex.value++ }

// 拖动横线滚动
const barScrollRef = ref<HTMLElement | null>(null)
let isDragging = false
let startX = 0
let scrollLeft = 0
const onDragStart = (e: MouseEvent) => {
  if (!barScrollRef.value) return
  isDragging = true
  barScrollRef.value.classList.add('active')
  startX = e.pageX - barScrollRef.value.getBoundingClientRect().left
  scrollLeft = barScrollRef.value.scrollLeft
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
}
const onDragMove = (e: MouseEvent) => {
  if (!isDragging || !barScrollRef.value) return
  const x = e.pageX - barScrollRef.value.getBoundingClientRect().left
  barScrollRef.value.scrollLeft = scrollLeft - (x - startX)
}
const onDragEnd = () => {
  isDragging = false
  if (barScrollRef.value) barScrollRef.value.classList.remove('active')
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
}
const onTouchStart = (e: TouchEvent) => {
  if (!barScrollRef.value) return
  isDragging = true
  barScrollRef.value.classList.add('active')
  startX = e.touches[0].pageX - barScrollRef.value.getBoundingClientRect().left
  scrollLeft = barScrollRef.value.scrollLeft
  document.addEventListener('touchmove', onTouchMove)
  document.addEventListener('touchend', onTouchEnd)
}
const onTouchMove = (e: TouchEvent) => {
  if (!isDragging || !barScrollRef.value) return
  const x = e.touches[0].pageX - barScrollRef.value.getBoundingClientRect().left
  barScrollRef.value.scrollLeft = scrollLeft - (x - startX)
}
const onTouchEnd = () => {
  isDragging = false
  if (barScrollRef.value) barScrollRef.value.classList.remove('active')
  document.removeEventListener('touchmove', onTouchMove)
  document.removeEventListener('touchend', onTouchEnd)
}
onMounted(() => {
  // 横线初始居中
  if (barScrollRef.value) {
    barScrollRef.value.scrollLeft = (barScrollRef.value.scrollWidth - barScrollRef.value.clientWidth) / 2
  }
})

const sectionRef = ref<HTMLElement | null>(null)
const zhRef = ref<HTMLElement | null>(null)
const btnRef = ref<HTMLElement | null>(null)
const animClass = ref('slide-down')
const btnAnimClass = ref('slide-down')
let observer: IntersectionObserver | null = null
let btnObserver: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animClass.value = 'slide-up'
      } else {
        animClass.value = 'slide-down'
      }
    },
    { threshold: 0.35 }
  )
  if (zhRef.value) observer.observe(zhRef.value)

  btnObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        btnAnimClass.value = 'slide-up'
      } else {
        btnAnimClass.value = 'slide-down'
      }
    },
    { threshold: 0.35 }
  )
  if (btnRef.value) btnObserver.observe(btnRef.value)
})

const cardAnimArr = ref<string[]>([])
const cardRefs = ref<any[]>([])
let cardObservers: IntersectionObserver[] = []

onMounted(async () => {
  await nextTick()
  cardAnimArr.value = forumCards.map(() => 'card-slide-out')
  cardRefs.value = cardRefs.value.slice(0, forumCards.length)
  forumCards.forEach((_, idx) => {
    const observer = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        cardAnimArr.value[idx] = 'card-slide-in'
      } else {
        cardAnimArr.value[idx] = 'card-slide-out'
      }
    }, { threshold: 0.25 })
    if (cardRefs.value[idx]) observer.observe(cardRefs.value[idx])
    cardObservers.push(observer)
  })
})
onUnmounted(() => {
  if (observer) observer.disconnect()
  if (btnObserver) btnObserver.disconnect()
  cardObservers.forEach(o => o.disconnect())
  cardObservers = []
})
</script>

<style scoped>
.forum-section {
  width: 100vw;
  background: #fff;
  padding: 0 0 32px 0;
}
.forum-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 900px;
  max-width: 96vw;
  margin: 0 auto 18px auto;
  height: 80px;
}
.forum-title-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.forum-en {
  font-size: 3.2rem;
  color: #ededed;
  font-style: italic;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin-bottom: -43px;
  margin-left: 8px;
  user-select: none;
}
.forum-zh {
  color: #e9711a;
  font-size: 2.1rem;
  font-weight: bold;
  margin-left: -200px;
  margin-top: 10px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.forum-zh.slide-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.forum-zh.slide-down {
  opacity: 0 !important;
  transform: translateY(40px) !important;
}
.forum-more-btn {
  padding: 7px 22px;
  border: 1.5px solid #222;
  border-radius: 22px;
  background: #fff;
  color: #222;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.forum-more-btn.slide-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.forum-more-btn.slide-down {
  opacity: 0 !important;
  transform: translateY(40px) !important;
}
.forum-more-btn:hover {
  background: #f7931e;
  color: #fff;
  border-color: #f7931e;
}
.carousel-wrapper {
  position: relative;
  width: 900px;
  max-width: 96vw;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  background: #f6f8fa;
}
.carousel-list {
  display: flex;
  transition: transform 0.5s cubic-bezier(.4,0,.2,1);
  height: 400px;
}
.forum-card {
  min-width: 210px;
  max-width: 210px;
  height: 320px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  margin: 0 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.forum-card-img-wrap {
  width: 100%;
  height: 950px;
  overflow: hidden;
  position: relative;
}
.img-mask {
  pointer-events: none;
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  z-index: 2;
  opacity: 0;
  background: linear-gradient(120deg, rgba(255,255,255,0.0) 40%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.0) 60%);
  transform: translateX(-100%) skewX(-20deg);
  transition: opacity 0.2s, transform 0.6s cubic-bezier(.4,0,.2,1);
}
.forum-card-img-wrap:hover .img-mask {
  opacity: 1;
  transform: translateX(100%) skewX(-20deg);
  transition: opacity 0.2s, transform 0.6s cubic-bezier(.4,0,.2,1);
}
.forum-card-img-wrap img {
  width: 100%;
  height: 170px;
  object-fit: cover;
}
.img-gradient-mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 48px;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.96) 100%);
  pointer-events: none;
  z-index: 2;
  transition: background 0.4s;
}
.forum-card:hover .img-gradient-mask {
  background: linear-gradient(to bottom, rgba(25,118,210,0) 0%, rgba(25,118,210,0.92) 100%);
}
.forum-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px 16px 4px 16px;
  background: #fff;
  transition: background 0.4s;
}
.forum-card:hover .forum-card-content {
  background: #1976d2;
}
.forum-card-title {
  font-size: 0.8rem;
  font-weight: bold;
  color: #2d3a4b;
  margin-bottom: 8px;
  line-height: 1.3;
  min-height: 2.2em;
  transition: color 0.4s;
}
.forum-card:hover .forum-card-title {
  color: #ffe082;
}
.forum-card-meta {
  font-size: 0.6rem;
  color: #888;
  margin-bottom: 6px;
  transition: color 0.4s;
}
.forum-card:hover .forum-card-meta {
  color: #fff;
}
.forum-card-btn {
  margin-top: auto;
  align-self: flex-start;
  background: #ffe082;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #e9711a;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s;
}
.forum-card-btn:hover {
  background: #f7931e;
  color: #fff;
}
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.85);
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  font-size: 2rem;
  color: #1976d2;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s;
}
.carousel-btn.left { left: 12px; }
.carousel-btn.right { right: 12px; }
.carousel-btn:hover { background: #1976d2; color: #fff; }
/* indicator-bar 相关样式已全部删除 */
.carousel-wrapper.no-shadow {
  box-shadow: none;
  background: transparent;
  overflow-x: auto;
  padding-bottom: 2px;
}
.horizontal-scroll {
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: max-content;
  min-width: 900px;
  padding: 0 8px;
}
.carousel-img-item {
  min-width: 210px;
  max-width: 210px;
  height: 320px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.carousel-img-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.horizontal-scroll::-webkit-scrollbar {
  height: 8px;
}
.horizontal-scroll::-webkit-scrollbar-thumb {
  background: #1976d2;
  border-radius: 4px;
}
.horizontal-scroll::-webkit-scrollbar-track {
  background: #e3eafc;
  border-radius: 4px;
}
.horizontal-scroll {
  scrollbar-color: #1976d2 #e3eafc;
  scrollbar-width: thin;
}
.card-slide-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.card-slide-out {
  opacity: 0 !important;
  transform: translateY(-40px) !important;
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
</style> 