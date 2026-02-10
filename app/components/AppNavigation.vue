<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'py-3' : 'py-5'"
    style="animation: slideDown 0.6s ease-out forwards"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div
        class="glass-card rounded-2xl transition-all duration-500"
        :class="scrolled ? 'shadow-lg shadow-black/20' : ''"
      >
        <div class="flex items-center justify-between px-6 py-4">
          <!-- Logo -->
          <a
            href="#home"
            class="flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform"
          >
            <div class="relative">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center glow"
              >
                <TerminalIcon :size="24" class="text-white" />
              </div>
              <div
                class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"
              />
            </div>
            <div class="hidden sm:block">
              <span class="text-xl font-bold t-heading">Wagner</span>
              <span class="text-xl font-bold text-gradient-static">Calazans</span>
            </div>
          </a>

          <!-- Desktop Menu -->
          <div class="hidden lg:flex items-center gap-1">
            <a
              v-for="item in navItems"
              :key="item.name"
              :href="item.href"
              class="relative px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
              :class="
                activeSection === item.href.slice(1)
                  ? 'text-sky-400'
                  : 't-muted hover:t-heading'
              "
            >
              {{ item.name }}
              <div
                v-if="activeSection === item.href.slice(1)"
                class="absolute inset-0 bg-sky-500/10 border border-sky-500/30 rounded-xl -z-10 transition-all duration-300"
              />
            </a>
          </div>

          <div class="flex items-center gap-3">
            <!-- Theme Toggle -->
            <div class="relative" ref="themeDropdownRef">
              <button
                class="p-2.5 rounded-xl glass-card t-muted hover:t-heading transition-all hover:scale-105 active:scale-95"
                aria-label="Alterar tema"
                @click="themeOpen = !themeOpen"
              >
                <Monitor v-if="preference === 'system'" :size="20" />
                <Sun v-else-if="preference === 'light'" :size="20" />
                <Moon v-else :size="20" />
              </button>

              <Transition name="fade">
                <div
                  v-if="themeOpen"
                  class="absolute right-0 top-full mt-2 glass-card rounded-xl p-1.5 min-w-[160px] shadow-xl z-50"
                >
                  <button
                    v-for="opt in themeOptions"
                    :key="opt.value"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                    :class="
                      preference === opt.value
                        ? 'text-sky-400 bg-sky-500/10'
                        : 't-muted hover:t-heading hover:bg-white/5'
                    "
                    @click="selectTheme(opt.value)"
                  >
                    <component :is="opt.icon" :size="16" />
                    {{ opt.label }}
                  </button>
                </div>
              </Transition>
            </div>

            <!-- CTA Button -->
            <a
              href="#contato"
              class="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              Contato
            </a>

            <!-- Mobile Menu Button -->
            <button
              class="lg:hidden p-2 t-muted hover:t-heading rounded-xl hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
              @click="isOpen = !isOpen"
            >
              <X v-if="isOpen" :size="24" />
              <MenuIcon v-else :size="24" />
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <Transition name="slide-down">
          <div v-if="isOpen" class="lg:hidden overflow-hidden">
            <div class="px-6 pb-4 pt-2 border-t" style="border-color: var(--glass-border)">
              <a
                v-for="item in navItems"
                :key="item.name"
                :href="item.href"
                class="block py-3 px-4 rounded-xl font-medium transition-all"
                :class="
                  activeSection === item.href.slice(1)
                    ? 'text-sky-400 bg-sky-500/10'
                    : 't-muted hover:t-heading hover:bg-white/5'
                "
                @click="isOpen = false"
              >
                {{ item.name }}
              </a>

              <!-- Mobile Theme Options -->
              <div class="flex gap-2 mt-3 pt-3 border-t" style="border-color: var(--glass-border)">
                <button
                  v-for="opt in themeOptions"
                  :key="opt.value"
                  class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                  :class="
                    preference === opt.value
                      ? 'text-sky-400 bg-sky-500/10 border border-sky-500/30'
                      : 'glass-card t-muted hover:t-heading'
                  "
                  @click="selectTheme(opt.value)"
                >
                  <component :is="opt.icon" :size="14" />
                  {{ opt.label }}
                </button>
              </div>

              <a
                href="#contato"
                class="block w-full text-center mt-4 px-6 py-3 bg-gradient-to-r from-sky-500 to-violet-600 text-white font-semibold rounded-xl"
                @click="isOpen = false"
              >
                Falar Comigo
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Terminal as TerminalIcon, Menu as MenuIcon, X, Sun, Moon, Monitor } from 'lucide-vue-next'
import { onClickOutside } from '@vueuse/core'

const navItems = [
  { name: 'Início', href: '#home' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Habilidades', href: '#habilidades' },
  { name: 'Atividades', href: '#atividades' },
  { name: 'Contato', href: '#contato' },
]

const themeOptions = [
  { value: 'light' as const, label: 'Claro', icon: Sun },
  { value: 'dark' as const, label: 'Escuro', icon: Moon },
  { value: 'system' as const, label: 'Sistema', icon: Monitor },
]

const isOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('home')
const themeOpen = ref(false)
const themeDropdownRef = ref<HTMLElement | null>(null)

const { preference, resolved, setTheme } = useTheme()

onClickOutside(themeDropdownRef, () => { themeOpen.value = false })

const selectTheme = (value: 'light' | 'dark' | 'system') => {
  setTheme(value)
  themeOpen.value = false
}

onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 50

    const sections = navItems.map(item => item.href.slice(1))
    const scrollPosition = window.scrollY + 150

    for (const section of [...sections].reverse()) {
      const element = document.getElementById(section)
      if (element && element.offsetTop <= scrollPosition) {
        activeSection.value = section
        break
      }
    }
  }

  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<style scoped>
@keyframes slideDown {
  from { transform: translateY(-100px); }
  to { transform: translateY(0); }
}
</style>
