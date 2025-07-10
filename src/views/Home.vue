<template>
  <div class="home-bg">
    <BannerCarousel />
    <NewsSection />
    <ForumSection />
    <TalentSection />
    <TeacherSection />
    <ResearchSection />
    <LifeSection />
    <AcademySection />
  </div>
</template>

<script setup lang="ts">
import BannerCarousel from '../components/BannerCarousel.vue'
import NewsSection from '../components/NewsSection.vue'
import ForumSection from '../components/ForumSection.vue'
import TalentSection from '../components/TalentSection.vue'
import TeacherSection from '../components/TeacherSection.vue'
import ResearchSection from '../components/ResearchSection.vue'
import LifeSection from '../components/LifeSection.vue'
import AcademySection from '../components/AcademySection.vue'
</script>

<style scoped>
.home-bg {
  position: relative;
  width: 100vw;
  background: #f5f6fa;
}
</style>
