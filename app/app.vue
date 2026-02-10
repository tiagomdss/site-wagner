<template>
  <div>
    <AppLoadingScreen v-if="isLoading" @complete="isLoading = false" />

    <div v-if="!isLoading" class="min-h-screen relative overflow-x-hidden">
      <AppBackground />
      <AppNavigation />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ActivitiesSection />
        <ContactSection />
      </main>

      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(true)

const { init } = useTheme()
onMounted(() => init())
</script>
