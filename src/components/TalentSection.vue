<template>
  <div class="talent-section-bg">
    <div class="talent-card">
      <div class="talent-left">
        <div class="talent-title">培养拔尖创新人才</div>
        <div class="talent-desc">大学定位为新型国际化研究型高水平大学，开展本科和研究生教育。</div>
        <div class="talent-btns">
          <button class="talent-btn blue">本科生招生 ➔</button>
          <button class="talent-btn orange">研究生招生 ➔</button>
        </div>
      </div>
      <div class="talent-right">
        <div class="talent-img-wrap">
          <img src="../assets/ZhaoSheng.jpg" alt="招生" />
          <div class="talent-img-mask"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.talent-section-bg {
  width: 100vw;
  min-height: 480px;
  background: linear-gradient(to bottom, #fff 50%, transparent 50%), url('../assets/ZhaoSheng-bg.png') center bottom/100% 50% no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0 48px 0;
}
.talent-card {
  width: 1200px;
  max-width: 96vw;
  min-height: 400px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  display: flex;
  align-items: stretch;
  overflow: hidden;
}
.talent-left {
  flex: 1.1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 56px 48px 56px 56px;
}
.talent-title {
  font-size: 2.4rem;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 24px;
}
.talent-desc {
  font-size: 1.15rem;
  color: #444;
  margin-bottom: 38px;
}
.talent-btns {
  display: flex;
  gap: 24px;
}
.talent-btn {
  font-size: 1.15rem;
  font-weight: bold;
  border: none;
  border-radius: 32px;
  padding: 14px 48px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 2px 8px rgba(25,118,210,0.08);
}
.talent-btn.blue {
  background: #1976d2;
  color: #fff;
}
.talent-btn.blue:hover {
  background: #1251a3;
}
.talent-btn.orange {
  background: #f7931e;
  color: #fff;
}
.talent-btn.orange:hover {
  background: #e9711a;
}
.talent-right {
  flex: 1.2;
  display: flex;
  align-items: stretch;
  position: relative;
  min-width: 0;
}
.talent-img-wrap {
  width: 100%;
  height: 100%;
  min-height: 320px;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 90% 100%, 0 100%);
  border-radius: 0 24px 24px 0;
}
.talent-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.talent-img-mask {
  position: absolute;
  left: 0; right: 0; bottom: 0; height: 80px;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 100%);
  pointer-events: none;
}
@media (max-width: 900px) {
  .talent-card {
    flex-direction: column;
    min-width: 0;
    width: 98vw;
    border-radius: 18px;
  }
  .talent-left {
    padding: 36px 18px 24px 18px;
  }
  .talent-right {
    min-height: 180px;
  }
  .talent-img-wrap {
    min-height: 180px;
    border-radius: 0 0 18px 18px;
    clip-path: none;
  }
}
</style> 