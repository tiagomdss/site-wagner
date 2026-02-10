<template>
  <section id="sobre" ref="sectionRef" class="py-24 lg:py-32 px-6 relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 section-reveal" :class="{ visible: isVisible }">
        <span class="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-medium text-sky-400 mb-4">
          Sobre Mim
        </span>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span class="t-heading">Transformando </span>
          <span class="text-gradient">infraestrutura</span>
          <br class="hidden md:block" />
          <span class="t-heading"> em resultados</span>
        </h2>
        <p class="text-xl t-muted max-w-3xl mx-auto leading-relaxed">
          Especialista em criar soluções robustas e escaláveis com foco em
          tecnologias open source e computação de alto desempenho.
        </p>
      </div>

      <!-- Feature Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="glass-card rounded-2xl p-6 text-center group hover:scale-[1.03] hover:-translate-y-1 transition-all card-reveal"
          :class="{ visible: isVisible }"
          :style="{ transitionDelay: index * 0.1 + 's' }"
        >
          <div
            :class="`inline-flex p-4 rounded-2xl mb-5 bg-gradient-to-br ${feature.color} group-hover:scale-110 group-hover:rotate-[5deg] transition-transform`"
          >
            <component :is="feature.icon" :size="28" class="text-white" />
          </div>
          <h3 class="text-xl font-bold mb-3 t-heading">{{ feature.title }}</h3>
          <p class="t-muted leading-relaxed text-sm">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Bio Section -->
      <div
        class="glass-card rounded-3xl p-8 md:p-12 overflow-hidden relative section-reveal"
        :class="{ visible: isVisible }"
        style="transition-delay: 0.4s"
      >
        <!-- Background glow -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />

        <div class="relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-3xl md:text-4xl font-bold mb-6 t-heading">
              Minha trajetória profissional
            </h3>
            <div class="space-y-4">
              <p class="t-muted leading-relaxed text-lg">
                Sou um Administrador de Sistemas Linux Sênior com ampla experiência na
                instalação, configuração e manutenção de plataformas de virtualização
                baseadas em Linux.
              </p>
              <p class="t-muted leading-relaxed text-lg">
                Tenho expertise comprovada em ferramentas de gestão de TI de código aberto,
                redes e comunicação de dados, e soluções robustas e escaláveis.
              </p>
              <p class="t-muted leading-relaxed text-lg">
                Possuo um forte comprometimento com a
                <span class="text-sky-400 font-semibold">filosofia do software livre</span> e
                incentivo projetos tecnológicos abertos e sociais.
              </p>
            </div>

            <!-- Tech tags -->
            <div class="flex flex-wrap gap-2 mt-6">
              <span
                v-for="tech in ['Linux', 'Docker', 'Kubernetes', 'Ansible', 'AWS', 'OpenStack']"
                :key="tech"
                class="px-3 py-1.5 glass-card text-sky-400 rounded-lg text-sm font-medium"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(stat, index) in stats"
              :key="stat.label"
              class="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform card-reveal"
              :class="{ visible: isVisible }"
              :style="{ transitionDelay: 0.5 + index * 0.1 + 's' }"
            >
              <component :is="stat.icon" :size="24" :class="`mx-auto mb-3 ${stat.color}`" />
              <div class="text-3xl md:text-4xl font-bold text-gradient mb-1">
                {{ stat.number }}
              </div>
              <div class="text-sm t-muted font-medium">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Open Source Badge -->
      <div
        class="mt-8 text-center section-reveal"
        :class="{ visible: isVisible }"
        style="transition-delay: 0.7s"
      >
        <div class="inline-flex items-center gap-3 glass-card px-6 py-4 rounded-2xl">
          <Globe :size="24" class="text-sky-400" />
          <p class="t-muted">
            <span class="font-semibold t-heading">Filosofia Open Source:</span>
            Contribuindo para um ecossistema tecnológico mais aberto e colaborativo
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Server, Shield, Cpu, Database, Award, Code2, Heart, Globe } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'

const features = [
  {
    icon: Server,
    title: 'Administração Linux',
    description: 'Instalação, configuração e manutenção de sistemas Unix/Linux em ambientes de alta disponibilidade.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Cpu,
    title: 'Virtualização',
    description: 'Plataformas de virtualização com VMware, Proxmox, KVM e soluções de containerização.',
    color: 'from-sky-500 to-blue-500',
  },
  {
    icon: Shield,
    title: 'Segurança',
    description: 'Implementação de políticas de segurança, firewalls, VPNs e hardening de sistemas.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Database,
    title: 'Storage & Backup',
    description: 'Soluções de armazenamento escaláveis e estratégias de backup e disaster recovery.',
    color: 'from-violet-500 to-purple-500',
  },
]

const stats = [
  { number: '10+', label: 'Anos de Experiência', icon: Award, color: 'text-sky-400' },
  { number: '100+', label: 'Projetos Realizados', icon: Code2, color: 'text-violet-400' },
  { number: '50+', label: 'Servidores Gerenciados', icon: Server, color: 'text-emerald-400' },
  { number: '100%', label: 'Software Livre', icon: Heart, color: 'text-pink-400' },
]

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
}, { rootMargin: '-100px' })
</script>
