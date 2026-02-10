<template>
  <section id="contato" ref="sectionRef" class="py-24 lg:py-32 px-6 relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 section-reveal" :class="{ visible: isVisible }">
        <span class="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-medium text-sky-400 mb-4">
          Contato
        </span>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span class="t-heading">Vamos </span>
          <span class="text-gradient">conversar</span>
          <span class="t-heading">?</span>
        </h2>
        <p class="text-xl t-muted max-w-3xl mx-auto">
          Estou disponível para projetos de consultoria, implementação e suporte em infraestrutura
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-8">
        <!-- Contact Info -->
        <div class="lg:col-span-2 space-y-4">
          <a
            v-for="(info, index) in contactInfo"
            :key="info.title"
            :href="info.link"
            :target="info.link.startsWith('http') ? '_blank' : undefined"
            :rel="info.link.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="glass-card rounded-2xl p-5 flex items-start gap-4 group block hover:translate-x-2 hover:scale-[1.02] transition-all card-reveal"
            :class="{ visible: isVisible }"
            :style="{ transitionDelay: 0.3 + index * 0.1 + 's' }"
          >
            <div :class="`p-3 rounded-xl bg-gradient-to-br ${info.color} shrink-0`">
              <component :is="info.icon" :size="22" class="text-white" />
            </div>
            <div class="flex-1">
              <h4 class="text-lg font-semibold t-heading mb-1">{{ info.title }}</h4>
              <p class="t-body font-medium">{{ info.value }}</p>
              <p class="t-muted text-sm mt-1">{{ info.description }}</p>
            </div>
            <ExternalLink :size="18" class="t-muted group-hover:text-sky-400 transition-colors" />
          </a>

          <!-- Schedule -->
          <div
            class="glass-card rounded-2xl p-5 card-reveal"
            :class="{ visible: isVisible }"
            style="transition-delay: 0.6s"
          >
            <div class="flex items-center gap-3 mb-4">
              <Clock :size="20" class="text-sky-400" />
              <h4 class="text-lg font-semibold t-heading">Horários</h4>
            </div>
            <div class="space-y-2 t-muted">
              <div class="flex justify-between">
                <span>Segunda - Sexta</span>
                <span class="t-body">9h - 18h</span>
              </div>
              <div class="flex justify-between">
                <span>Sábado</span>
                <span class="t-body">10h - 14h</span>
              </div>
              <div class="flex justify-between">
                <span>Domingo</span>
                <span class="t-muted-2">Fechado</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-3">
          <div class="glass-card rounded-3xl p-8 md:p-10">
            <div class="flex items-center gap-3 mb-8">
              <MessageCircle :size="24" class="text-sky-400" />
              <h3 class="text-2xl font-bold t-heading">Envie uma mensagem</h3>
            </div>

            <Transition name="fade" mode="out-in">
              <div v-if="isSubmitted" key="success" class="text-center py-12">
                <div
                  class="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle :size="40" class="text-white" />
                </div>
                <h4 class="text-2xl font-bold t-heading mb-2">Mensagem Enviada!</h4>
                <p class="t-muted">Obrigado pelo contato. Responderei em breve.</p>
              </div>

              <form v-else key="form" class="space-y-6" @submit.prevent="handleSubmit">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-sm font-semibold t-body mb-2">
                      Nome
                    </label>
                    <input
                      id="name"
                      v-model="formData.name"
                      type="text"
                      class="w-full px-5 py-4 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl t-body placeholder-[var(--text-muted-2)] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-semibold t-body mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      v-model="formData.email"
                      type="email"
                      class="w-full px-5 py-4 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl t-body placeholder-[var(--text-muted-2)] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label for="subject" class="block text-sm font-semibold t-body mb-2">
                    Assunto
                  </label>
                  <input
                    id="subject"
                    v-model="formData.subject"
                    type="text"
                    class="w-full px-5 py-4 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl t-body placeholder-[var(--text-muted-2)] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="Sobre o que você quer falar?"
                    required
                  />
                </div>

                <div>
                  <label for="message" class="block text-sm font-semibold t-body mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    rows="5"
                    class="w-full px-5 py-4 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl t-body placeholder-[var(--text-muted-2)] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                    placeholder="Descreva seu projeto ou necessidade..."
                    required
                  />
                </div>

                  <div v-if="isError" class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
                    {{ errorMessage }}
                  </div>

                  <button
                    type="submit"
                  :disabled="isSubmitting"
                  class="w-full py-5 bg-gradient-to-r from-sky-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <template v-if="isSubmitting">
                    <div
                      class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      style="animation: spin 1s linear infinite"
                    />
                    Enviando...
                  </template>
                  <template v-else>
                    <Send :size="20" />
                    Enviar Mensagem
                  </template>
                </button>
              </form>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, ExternalLink } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitted = ref(false)
const isSubmitting = ref(false)
const isError = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  isError.value = false
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    })

    isSubmitted.value = true
    setTimeout(() => {
      isSubmitted.value = false
      formData.name = ''
      formData.email = ''
      formData.subject = ''
      formData.message = ''
    }, 5000)
  } catch (err: any) {
    console.error(err)
    isError.value = true
    errorMessage.value = err.data?.message || err.message || 'Erro ao enviar mensagem. Verifique a conexão ou tente novamente mais tarde.'
  } finally {
    isSubmitting.value = false
  }
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefone',
    value: '+55 21 2141-7142',
    description: 'Horário comercial',
    link: 'tel:+552121417142',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contato@wagnercalazans.com',
    description: 'Resposta em até 24h',
    link: 'mailto:contato@wagnercalazans.com',
    color: 'from-sky-500 to-blue-500',
  },
  {
    icon: MapPin,
    title: 'Localização',
    value: 'Rio de Janeiro, Brasil',
    description: 'Disponível para remoto',
    link: '#',
    color: 'from-violet-500 to-purple-500',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([entry]) => {
  if (entry && entry.isIntersecting) isVisible.value = true
}, { rootMargin: '-100px' })
</script>
