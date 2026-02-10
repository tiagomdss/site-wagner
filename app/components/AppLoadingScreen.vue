<template>
  <Transition name="fade">
    <div
      v-if="!exiting"
      class="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-slate-950"
    >
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px]"
          style="animation: orb-float-1 4s ease-in-out infinite"
        />
        <div
          class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/20 rounded-full blur-[80px]"
          style="animation: orb-float-2 5s ease-in-out 1s infinite"
        />

        <!-- Grid pattern -->
        <div class="absolute inset-0 opacity-[0.03] bg-grid-pattern" />
      </div>

      <!-- Main content -->
      <div class="relative text-center z-10">
        <!-- Logo -->
        <div class="mb-8 animate-[spin_0.8s_ease-out_forwards]" style="animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; animation-name: logo-appear;">
          <div
            class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-sky-500 to-violet-600 rounded-3xl shadow-2xl shadow-sky-500/30"
          >
            <Terminal :size="48" class="text-white" />
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          Wagner <span class="text-gradient-static">Calazans</span>
        </h1>

        <p class="text-slate-400 mb-8 font-mono text-sm">
          Iniciando sistemas...
        </p>

        <!-- Progress bar -->
        <div class="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mx-auto mb-4">
          <div
            class="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-600 transition-all duration-100"
            :style="{ width: progress + '%' }"
          />
        </div>

        <!-- Progress text -->
        <p class="text-sm text-slate-500 font-mono">
          {{ Math.round(progress) }}%
        </p>

        <!-- Loading dots -->
        <div class="flex justify-center gap-2 mt-6">
          <div
            v-for="i in 3"
            :key="i"
            class="w-2 h-2 bg-sky-500 rounded-full"
            :style="{
              animation: 'dot-pulse 1s ease-in-out infinite',
              animationDelay: (i - 1) * 0.2 + 's',
            }"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Terminal } from 'lucide-vue-next'

const emit = defineEmits<{
  complete: []
}>()

const progress = ref(0)
const exiting = ref(false)

onMounted(() => {
  const duration = 2000
  const interval = 20
  const steps = duration / interval
  let currentStep = 0

  const timer = setInterval(() => {
    currentStep++
    const newProgress = Math.min((currentStep / steps) * 100, 100)
    progress.value = newProgress

    if (newProgress >= 100) {
      clearInterval(timer)
      setTimeout(() => {
        exiting.value = true
        setTimeout(() => emit('complete'), 600)
      }, 300)
    }
  }, interval)

  onUnmounted(() => clearInterval(timer))
})
</script>

<style scoped>
@keyframes logo-appear {
  from {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.bg-grid-pattern {
  background-image: linear-gradient(rgba(14, 165, 233, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.5) 1px, transparent 1px);
  background-size: 50px 50px;
}
</style>
