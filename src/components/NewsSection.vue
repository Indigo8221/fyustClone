<template>
  <div class="news-section" ref="sectionRef">
    <span class="en-bg" :class="animClass">NEWS</span>
    <div class="zh-row">
      <span class="zh" :class="animClass">————— 新闻动态</span>
    </div>
    <button class="more-btn" ref="moreBtnRef" :class="moreBtnAnim">查看更多 &gt;</button>
    <div class="news-cards">
      <div class="news-card big" ref="bigCardRef" :class="bigCardAnim">
        <img :src="cards[0].img" :alt="cards[0].title" />
        <div class="news-info">
          <div class="news-main-title">{{ cards[0].title }}</div>
          <div v-if="cards[0].desc" class="news-desc">{{ cards[0].desc }}</div>
          <div class="news-date">{{ cards[0].date }}</div>
        </div>
      </div>
      <div class="right-cards">
        <div class="news-card small" ref="rightCard1Ref" :class="rightCard1Anim">
          <img :src="cards[1].img" :alt="cards[1].title" />
          <div class="img-mask"></div>
          <div class="news-info">
            <div class="news-main-title">{{ cards[1].title }}</div>
            <div class="news-date">{{ cards[1].date }}</div>
          </div>
        </div>
        <div class="news-card small" ref="rightCard2Ref" :class="rightCard2Anim">
          <img :src="cards[2].img" :alt="cards[2].title" />
          <div class="img-mask"></div>
          <div class="news-info">
            <div class="news-main-title">{{ cards[2].title }}</div>
            <div class="news-date">{{ cards[2].date }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import banner1 from '../assets/news_section.png'
import banner2 from '../assets/news_people1.jpg'
import banner3 from '../assets/news_people2.webp'

const show = ref(false)
const animClass = ref('slide-down')
const sectionRef = ref<HTMLElement | null>(null)

const bigCardRef = ref<HTMLElement | null>(null)
const bigCardAnim = ref('slide-out-left')

const rightCard1Ref = ref<HTMLElement | null>(null)
const rightCard1Anim = ref('slide-out-right')

const rightCard2Ref = ref<HTMLElement | null>(null)
const rightCard2Anim = ref('slide-out-up')

let observer: IntersectionObserver | null = null
let cardObserver: IntersectionObserver | null = null
let rightCard1Observer: IntersectionObserver | null = null
let rightCard2Observer: IntersectionObserver | null = null

const moreBtnRef = ref<HTMLElement | null>(null)
const moreBtnAnim = ref('slide-out-up')
let moreBtnObserver: IntersectionObserver | null = null

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 100)

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
  if (sectionRef.value) observer.observe(sectionRef.value)

  cardObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        bigCardAnim.value = 'slide-in-left'
      } else {
        bigCardAnim.value = 'slide-out-left'
      }
    },
    { threshold: 0.3 }
  )
  if (bigCardRef.value) cardObserver.observe(bigCardRef.value)

  rightCard1Observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        rightCard1Anim.value = 'slide-in-right'
      } else {
        rightCard1Anim.value = 'slide-out-right'
      }
    },
    { threshold: 0.3 }
  )
  if (rightCard1Ref.value) rightCard1Observer.observe(rightCard1Ref.value)

  rightCard2Observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        rightCard2Anim.value = 'slide-in-up'
      } else {
        rightCard2Anim.value = 'slide-out-up'
      }
    },
    { threshold: 0.3 }
  )
  if (rightCard2Ref.value) rightCard2Observer.observe(rightCard2Ref.value)

  moreBtnObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        moreBtnAnim.value = 'slide-in-up'
      } else {
        moreBtnAnim.value = 'slide-out-up'
      }
    },
    { threshold: 0.35 }
  )
  if (moreBtnRef.value) moreBtnObserver.observe(moreBtnRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if (cardObserver) cardObserver.disconnect()
  if (rightCard1Observer) rightCard1Observer.disconnect()
  if (rightCard2Observer) rightCard2Observer.disconnect()
  if (moreBtnObserver) moreBtnObserver.disconnect()
})

const cards = [
  {
    img: banner1,
    size: 'big',
    title: '福耀科技大学正式获教育部批准设立',
    desc: '聚焦“高起点、小而精、研究型、国际化”的办学方向，努力探索出一条为党育人、为国育才的新型研究型大学创新发展之路。',
    date: '2025.03.11'
  },
  {
    img: banner2,
    size: 'small',
    title: '香港城市大学校长梅彦昌院士一行来访福耀科技大学',
    date: '2025.07.07'
  },
  {
    img: banner3,
    size: 'small',
    title: '史太白技术管理中国总部一行来访福耀科技大学洽谈合作',
    date: '2025.06.23'
  }
]
</script>

<style scoped>
.news-section {
  width: 100vw;
  height: 45vw;
  background: #fafbfc;
  padding: 40px 0 60px 0;
  position: relative;
  overflow: hidden;
}
.news-section::before {
  content: "";
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  background: url('../assets/news_section-bg.png') center/cover no-repeat;
  opacity: 1;
  z-index: 0;
  pointer-events: none;
}
.news-title {
  position: relative;
  margin-left: 80px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 110px;
  justify-content: flex-end;
}
.en-bg {
  position: absolute;
  top: 50px;
  left: 180px;
  font-size: 2.5rem;
  color: #ededed;
  font-style: italic;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  letter-spacing: 0.1em;
  z-index: 0;
  user-select: none;
  pointer-events: none;
}
.zh-row {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}
.zh {
  color: #e9711a;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
  margin-top: 38px;
  margin-left: 70px;
}
.more-btn {
  position: absolute;
  right: 190px;
  top: 15%;
  /* transform: translateY(-20%); */
  padding: 8px 24px;
  border: 1px solid #888;
  border-radius: 24px;
  background: #fff;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
  opacity: 0;
  transform: translateY(60px);
}
.more-btn:hover {
  background: #f7931e;
  color: #fff;
  border-color: #f7931e;
}
.news-cards {
  display: flex;
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  align-items: stretch;
  margin-top: 70px;
  /* transition: transform 0.35s cubic-bezier(.4,0,.2,1); */
}
/* .news-cards:hover {
  transform: scale(1.025);
} */
.news-card.big {
  flex: 1 1 0;
  height: 480px;
}
.news-card.big .news-info {
  background: rgba(145,108,92,0.67);
}
.news-card.small .news-info {
  background: rgba(0,0,0,0.5);
}
.right-cards {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  height: 480px;
  gap: 16px;
}
.news-card.small {
  position: relative;
  flex: 1 1 0;
  height: 50%;
  margin: 0;
}
.news-card {
  background: transparent;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s, opacity 1, transform 0.7s;
  opacity: 1;
  z-index: 1000;
}
.news-card img {
  width: 100%;
  height: 65%;
  object-fit: cover;
  transition: transform 0.35s cubic-bezier(.4,0,.2,1);
  z-index: 1;
}
.news-card:hover img {
  transform: scale(1.06);
}
/* 斜线动画遮罩 */
.news-card.small .img-mask {
  pointer-events: none;
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  z-index: 2;
  opacity: 0;
  background: linear-gradient(120deg, rgba(255,255,255,0.0) 40%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.0) 60%);
  transform: translateX(-100%) skewX(-20deg);
  transition: opacity 0.2s, transform 0.6s cubic-bezier(.4,0,.2,1);
}
.news-card.small:hover .img-mask {
  opacity: 1;
  transform: translateX(100%) skewX(-20deg);
  transition: opacity 0.2s, transform 0.6s cubic-bezier(.4,0,.2,1);
}
.news-info {
  padding: 12px 16px 8px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 35%;
}
.news-main-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.3;
}
.news-desc {
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 8px;
}
.news-date {
  font-size: 0.9rem;
  color: #bdbdbd;
  margin-top: auto;
}
@media (max-width: 1100px) {
  .news-cards {
    flex-direction: column;
    align-items: center;
    max-width: 98vw;
  }
  .news-card.big, .right-cards {
    width: 90vw;
    max-width: 800px;
    height: auto;
  }
  .right-cards {
    flex-direction: row;
    height: auto;
  }
  .news-card.small {
    height: auto;
  }
}

.fade-in-enter-active {
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.fade-in-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-in-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.en-bg, .zh {
  display: inline-block;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.slide-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.slide-down {
  opacity: 0 !important;
  transform: translateY(40px) !important;
}
.news-card.big {
  opacity: 0;
  transform: translateX(-60px);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.news-card.big.slide-in-left {
  opacity: 1 !important;
  transform: translateX(0) !important;
}
.news-card.big.slide-out-left {
  opacity: 0 !important;
  transform: translateX(-60px) !important;
}
.news-card.small {
  opacity: 0;
  transform: translateX(60px);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.news-card.small.slide-in-right {
  opacity: 1 !important;
  transform: translateX(0) !important;
}
.news-card.small.slide-out-right {
  opacity: 0 !important;
  transform: translateX(60px) !important;
}
.news-card.small.slide-in-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.news-card.small.slide-out-up {
  opacity: 0 !important;
  transform: translateY(60px) !important;
}
.more-btn.slide-in-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.more-btn.slide-out-up {
  opacity: 0 !important;
  transform: translateY(60px) !important;
}
</style> 