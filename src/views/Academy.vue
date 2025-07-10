<template>
  <div class="academy">
    <h2>学院设置</h2>
    <ul class="academy-list">
      <li>计算与人工智能学院</li>
      <li>智造与未来技术学院</li>
      <li>运载与智慧交通学院</li>
      <li>新材料与新能源学院</li>
      <li>生命与健康科学学院</li>
      <li>数字经济与管理学院</li>
      <li>文理学院</li>
      <li>马克思主义学院</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.academy {
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 32px 40px;
}
.academy h2 {
  color: #1a237e;
  margin-bottom: 24px;
}
.academy-list {
  list-style: disc inside;
  color: #333;
  font-size: 16px;
  padding-left: 0;
}
.academy-list li {
  margin-bottom: 16px;
}
</style> 