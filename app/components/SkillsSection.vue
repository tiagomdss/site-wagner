<template>
  <section id="habilidades" ref="sectionRef" class="py-24 lg:py-32 px-6 relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 section-reveal" :class="{ visible: isVisible }">
        <span class="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-medium text-sky-400 mb-4">
          Habilidades
        </span>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span class="t-heading">Tecnologias que </span>
          <span class="text-gradient">domino</span>
        </h2>
        <p class="text-xl t-muted max-w-3xl mx-auto">
          Expertise em ferramentas e tecnologias de infraestrutura e DevOps
        </p>
      </div>

      <!-- Category Tabs -->
      <div class="flex flex-wrap justify-center gap-2 mb-12 section-reveal" :class="{ visible: isVisible }" style="transition-delay: 0.2s">
        <button
          v-for="category in skillCategories"
          :key="category.id"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
          :class="
            activeCategory === category.id
              ? 'bg-gradient-to-r from-sky-500 to-violet-600 text-white shadow-lg shadow-sky-500/25'
              : 'glass-card t-muted hover:t-heading'
          "
          @click="activeCategory = category.id"
        >
          <component :is="category.icon" :size="18" />
          <span class="hidden sm:inline">{{ category.title }}</span>
        </button>
      </div>

      <!-- Skills Display -->
      <div class="glass-card rounded-3xl p-8 md:p-12">
        <template v-if="activeData">
          <div class="flex items-center gap-4 mb-8">
            <div :class="`p-4 rounded-2xl bg-gradient-to-br ${activeData.color}`">
              <component :is="activeData.icon" :size="32" class="text-white" />
            </div>
            <div>
              <h3 class="text-2xl font-bold t-heading">{{ activeData.title }}</h3>
              <p class="t-muted">Competências e ferramentas</p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="(skill, index) in activeData.skills" :key="skill.name">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold t-body flex items-center gap-2">
                  <ChevronRight :size="16" class="text-sky-400" />
                  {{ skill.name }}
                </span>
                <span
                  :class="`font-bold bg-gradient-to-r ${activeData.color} bg-clip-text text-transparent`"
                >
                  {{ skill.level }}%
                </span>
              </div>
              <div class="h-3 bg-[var(--input-bg)] rounded-full overflow-hidden">
                <div
                  :class="`h-full bg-gradient-to-r ${activeData.color} rounded-full relative overflow-hidden transition-all duration-1000`"
                  :style="{ width: animatedWidths[activeData.id]?.[index] ?? '0%', transitionDelay: index * 0.1 + 's' }"
                >
                  <div
                    class="absolute inset-0 bg-white/20"
                    style="animation: progress-shimmer 2s ease-in-out 3s infinite"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Server, Network, Container, Code2, Shield, Cloud, Activity, ChevronRight } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'

const skillCategories = [
  {
    id: 'systems',
    title: 'Sistemas',
    icon: Server,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Unix/Linux', level: 98 },
      { name: 'Windows Server', level: 85 },
      { name: 'MacOS', level: 80 },
      { name: 'Administração de Servidores', level: 95 },
    ],
  },
  {
    id: 'network',
    title: 'Redes',
    icon: Network,
    color: 'from-sky-500 to-blue-500',
    skills: [
      { name: 'TCP/IP', level: 95 },
      { name: 'DNS/DHCP', level: 98 },
      { name: 'Firewall (iptables/nftables)', level: 92 },
      { name: 'Load Balancing', level: 88 },
    ],
  },
  {
    id: 'virtualization',
    title: 'Virtualização',
    icon: Container,
    color: 'from-violet-500 to-purple-500',
    skills: [
      { name: 'VMware vSphere', level: 90 },
      { name: 'Proxmox VE', level: 95 },
      { name: 'KVM/QEMU', level: 92 },
      { name: 'Docker/Kubernetes', level: 88 },
    ],
  },
  {
    id: 'development',
    title: 'Desenvolvimento',
    icon: Code2,
    color: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'Shell Script (Bash)', level: 95 },
      { name: 'Python', level: 85 },
      { name: 'Ansible/Terraform', level: 88 },
      { name: 'CI/CD Pipelines', level: 82 },
    ],
  },
  {
    id: 'security',
    title: 'Segurança',
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    skills: [
      { name: 'SSL/TLS', level: 95 },
      { name: 'VPN (OpenVPN/WireGuard)', level: 92 },
      { name: 'SELinux/AppArmor', level: 85 },
      { name: 'Hardening', level: 90 },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    icon: Cloud,
    color: 'from-cyan-500 to-sky-500',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Google Cloud', level: 80 },
      { name: 'OpenStack', level: 88 },
      { name: 'Terraform', level: 85 },
    ],
  },
  {
    id: 'monitoring',
    title: 'Monitoramento',
    icon: Activity,
    color: 'from-amber-500 to-orange-500',
    skills: [
      { name: 'Zabbix', level: 95 },
      { name: 'Prometheus/Grafana', level: 90 },
      { name: 'ELK Stack', level: 85 },
      { name: 'Nagios', level: 88 },
    ],
  },
]

const activeCategory = ref(skillCategories[0].id)
const animatedWidths = ref<Record<string, string[]>>({})

const activeData = computed(() => skillCategories.find(cat => cat.id === activeCategory.value))

watch(activeCategory, (newCat) => {
  const cat = skillCategories.find(c => c.id === newCat)
  if (!cat) return
  animatedWidths.value[newCat] = cat.skills.map(() => '0%')
  nextTick(() => {
    setTimeout(() => {
      animatedWidths.value[newCat] = cat.skills.map(s => s.level + '%')
    }, 50)
  })
}, { immediate: true })

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([entry]) => {
  if (entry && entry.isIntersecting) isVisible.value = true
}, { rootMargin: '-100px' })
</script>
