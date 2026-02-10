<template>
  <footer class="relative py-16 px-6 border-t border-[var(--divider)]">
    <div class="max-w-7xl mx-auto">
      <div ref="footerRef" class="glass-card rounded-3xl p-8 md:p-12 section-reveal" :class="{ visible: isVisible }">
        <div class="grid md:grid-cols-4 gap-10 mb-10">
          <!-- Brand -->
          <div class="md:col-span-2">
            <a
              href="#home"
              class="flex items-center gap-3 mb-4 hover:scale-105 transition-transform w-fit"
            >
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center"
              >
                <TerminalIcon :size="24" class="text-white" />
              </div>
              <div>
                <span class="text-xl font-bold t-heading">Wagner</span>
                <span class="text-xl font-bold text-gradient-static">Calazans</span>
              </div>
            </a>
            <p class="t-muted mb-6 max-w-md leading-relaxed">
              Administrador de Sistemas Linux Sênior especializado em computação de alto
              desempenho, virtualização e soluções open source.
            </p>

            <!-- Social Links -->
            <div class="flex gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 rounded-xl glass-card t-muted hover:text-sky-400 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all"
                :aria-label="social.label"
              >
                <component :is="social.icon" :size="20" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-bold t-heading mb-4">Links Rápidos</h4>
            <ul class="space-y-3">
              <li v-for="link in quickLinks" :key="link.name">
                <a
                  :href="link.href"
                  class="t-muted hover:text-sky-400 hover:translate-x-1 transition-all inline-block"
                >
                  {{ link.name }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-lg font-bold t-heading mb-4">Contato</h4>
            <ul class="space-y-3 t-muted">
              <li>contato@wagnercalazans.com</li>
              <li>+55 21 2141-7142</li>
              <li>Rio de Janeiro, Brasil</li>
            </ul>
          </div>
        </div>

        <!-- Divider -->
        <div class="h-px bg-gradient-to-r from-transparent via-[var(--divider)] to-transparent mb-8" />

        <!-- Bottom -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="t-muted-2 text-sm">
            © {{ currentYear }} Wagner Calazans. Todos os direitos reservados.
          </p>
          <p class="t-muted-2 text-sm flex items-center gap-2">
            Feito com
            <Heart :size="14" class="text-red-500 fill-current animate-pulse" />
            e muito café
          </p>
        </div>
      </div>
    </div>

    <!-- Scroll to top button -->
    <button
      class="fixed bottom-8 right-8 p-4 glass-card rounded-full shadow-xl z-40 hover:border-sky-500/30 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all group"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <ArrowUp :size="20" class="text-sky-400 group-hover:-translate-y-1 transition-transform" />
    </button>
  </footer>
</template>

<script setup lang="ts">
import { Heart, Github, Linkedin, Mail, ArrowUp, Terminal as TerminalIcon } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'

const quickLinks = [
  { name: 'Início', href: '#home' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Habilidades', href: '#habilidades' },
  { name: 'Atividades', href: '#atividades' },
  { name: 'Contato', href: '#contato' },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contato@wagnercalazans.com', label: 'Email' },
]

const currentYear = new Date().getFullYear()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const footerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(footerRef, ([entry]) => {
  if (entry && entry.isIntersecting) isVisible.value = true
}, { rootMargin: '-50px' })
</script>
