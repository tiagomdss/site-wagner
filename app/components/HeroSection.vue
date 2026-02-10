<template>
  <section id="home" class="min-h-screen flex items-center justify-center relative pt-24 pb-16">
    <div class="max-w-7xl mx-auto px-6 w-full">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left Content -->
        <div class="text-center lg:text-left order-2 lg:order-1">
          <!-- Status Badge -->
          <div class="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 hero-animate" style="--delay: 0.2s">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span class="text-sm font-medium t-muted">Disponível para projetos</span>
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 hero-animate" style="--delay: 0.3s">
            <span class="t-heading">Wagner</span>
            <br />
            <span class="text-gradient">Calazans</span>
          </h1>

          <!-- Title -->
          <div class="mb-6 hero-animate" style="--delay: 0.4s">
            <p class="text-xl sm:text-2xl text-sky-400 font-semibold mb-2">
              Mestrando em Sistemas e Computação
            </p>
            <p class="text-lg t-muted">
              Engenheiro da Computação &amp; Analista de Sistemas
            </p>
          </div>

          <!-- Description -->
          <p class="text-lg t-muted mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed hero-animate" style="--delay: 0.5s">
            Administrador de Sistemas Linux Sênior especializado em
            <span class="text-sky-400 font-medium">computação de alto desempenho</span>,
            virtualização e soluções open source escaláveis.
          </p>

          <!-- Highlights -->
          <div class="flex flex-wrap justify-center lg:justify-start gap-3 mb-8 hero-animate" style="--delay: 0.6s">
            <div
              v-for="item in highlights"
              :key="item.label"
              class="glass-card px-4 py-2 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <div :class="`p-1.5 rounded-lg bg-gradient-to-br ${item.color}`">
                <component :is="item.icon" :size="14" class="text-white" />
              </div>
              <span class="text-sm font-medium t-muted">{{ item.label }}</span>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10 hero-animate" style="--delay: 0.7s">
            <a
              href="#contato"
              class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-500 to-violet-600 text-white font-semibold rounded-2xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Mail :size="20" />
              Falar Comigo
            </a>
            <a
              href="#sobre"
              class="w-full sm:w-auto glass-card px-8 py-4 rounded-2xl font-semibold t-muted hover:t-heading hover:scale-105 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Saiba Mais
              <ArrowDown :size="18" />
            </a>
          </div>

          <!-- Social Links -->
          <div class="flex items-center justify-center lg:justify-start gap-4 hero-animate" style="--delay: 0.9s">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              :target="social.href.startsWith('http') ? '_blank' : undefined"
              :rel="social.href.startsWith('http') ? 'noopener noreferrer' : undefined"
              class="glass-card p-4 rounded-2xl t-muted hover:text-sky-400 hover:scale-[1.15] hover:-translate-y-1 active:scale-95 transition-all"
              :aria-label="social.label"
            >
              <component :is="social.icon" :size="22" />
            </a>
          </div>
        </div>

        <!-- Right Content - Profile -->
        <div class="relative order-1 lg:order-2 flex justify-center">
          <div class="relative">
            <!-- Glow effect behind image -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-sky-500/30 to-violet-600/30 rounded-full blur-3xl"
              style="animation: hero-glow 4s ease-in-out infinite"
            />

            <!-- Profile image container -->
            <div class="relative" style="animation: hero-float 5s ease-in-out infinite">
              <div class="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full glass-card p-2 glow">
                <img
                  src="/wagner.png"
                  alt="Wagner Calazans"
                  class="w-full h-full rounded-full object-cover"
                />
              </div>

              <!-- Floating badges -->
              <div
                class="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-xl"
                style="animation: float-badge-1 4s ease-in-out 0.5s infinite"
              >
                <div class="flex items-center gap-2">
                  <span class="text-2xl">🐧</span>
                  <span class="text-sm font-semibold t-heading">Linux Expert</span>
                </div>
              </div>

              <div
                class="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-xl"
                style="animation: float-badge-2 5s ease-in-out 1s infinite"
              >
                <div class="flex items-center gap-2">
                  <span class="text-2xl">☁️</span>
                  <span class="text-sm font-semibold t-heading">Cloud Native</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 hero-animate" style="--delay: 1.2s">
        <div class="text-slate-500" style="animation: scroll-bounce 2s ease-in-out infinite">
          <ArrowDown :size="24" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Github, Linkedin, Mail, ArrowDown, Server, Shield, Cloud } from 'lucide-vue-next'

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: '#contato', label: 'Email' },
]

const highlights = [
  { icon: Server, label: 'Linux Sênior', color: 'from-orange-500 to-red-500' },
  { icon: Shield, label: 'Segurança', color: 'from-emerald-500 to-teal-500' },
  { icon: Cloud, label: 'Cloud & DevOps', color: 'from-sky-500 to-blue-500' },
]
</script>

<style scoped>
.hero-animate {
  opacity: 0;
  transform: translateY(30px);
  animation: hero-fade-in 0.8s ease-out forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes hero-fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
