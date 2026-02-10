<template>
  <section id="atividades" ref="sectionRef" class="py-24 lg:py-32 px-6 relative overflow-hidden">
    <div class="max-w-4xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 section-reveal" :class="{ visible: isVisible }">
        <span class="inline-block px-4 py-1.5 glass-card rounded-full text-sm font-medium text-sky-400 mb-4">
          Áreas de Atuação
        </span>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span class="t-heading">Minhas </span>
          <span class="text-gradient">Atividades</span>
        </h2>
        <p class="text-xl t-muted max-w-3xl mx-auto leading-relaxed">
          Atuo como Administrador de Sistemas Linux Sênior, especializado em plataformas
          de virtualização e ferramentas de gestão de TI de código aberto.
        </p>
      </div>

      <!-- Activities Accordion -->
      <div class="space-y-3">
        <div
          v-for="(activity, index) in activities"
          :key="activity.id"
          class="glass-card rounded-2xl overflow-hidden card-reveal"
          :class="{ visible: isVisible }"
          :style="{ transitionDelay: 0.3 + index * 0.05 + 's' }"
        >
          <button
            class="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--glass-border)] transition-colors"
            @click="toggleActivity(activity.id)"
          >
            <div class="flex items-center gap-4">
              <div :class="`p-3 rounded-xl bg-gradient-to-br ${activity.color}`">
                <component :is="activity.icon" :size="22" class="text-white" />
              </div>
              <h4 class="text-lg font-semibold t-heading">{{ activity.title }}</h4>
            </div>
            <div
              class="t-muted transition-transform duration-300"
              :class="{ 'rotate-180': openId === activity.id }"
            >
              <ChevronDown :size="22" />
            </div>
          </button>

          <Transition name="slide-down">
            <div v-if="openId === activity.id" class="overflow-hidden">
              <div class="px-5 pb-5 pt-2 border-t border-[var(--divider)]">
                <p class="t-muted mb-4 leading-relaxed">
                  {{ activity.description }}
                </p>
                <div class="grid sm:grid-cols-2 gap-2">
                  <div
                    v-for="(detail, i) in activity.details"
                    :key="i"
                    class="flex items-center gap-2 text-sm t-muted-2"
                  >
                    <div
                      :class="`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${activity.color}`"
                    />
                    {{ detail }}
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ChevronDown,
  Server,
  Globe,
  Key,
  Shield,
  Mail,
  Database,
  HardDrive,
  Network,
  Container,
  Cloud,
  Code2,
  Activity,
  FileText,
} from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'

interface ActivityItem {
  id: string
  title: string
  icon: any
  color: string
  description: string
  details: string[]
}

const activities: ActivityItem[] = [
  {
    id: 'systems',
    title: 'Sistemas',
    icon: Server,
    color: 'from-orange-500 to-red-500',
    description: 'Instalação, configuração, manutenção, monitoramento, documentação e automação de sistemas operacionais Linux.',
    details: [
      'Debian, Ubuntu, CentOS, Rocky Linux, AlmaLinux',
      'Hardening e otimização de performance',
      'Gerenciamento de pacotes e repositórios',
      'Automação com Ansible e Puppet',
    ],
  },
  {
    id: 'dns',
    title: 'DNS',
    icon: Globe,
    color: 'from-sky-500 to-blue-500',
    description: 'Criação e gerência de servidores autoritativos, réplicas, criação e delegação de zonas.',
    details: ['BIND9 e PowerDNS', 'Integração com LDAP/OpenLDAP', 'DNSSEC para segurança', 'Split-horizon DNS'],
  },
  {
    id: 'ldap',
    title: 'LDAP, IDPs, ISPs, Kerberos e SAML',
    icon: Key,
    color: 'from-violet-500 to-purple-500',
    description: 'Implementação de soluções de autenticação centralizada e gerenciamento de identidades.',
    details: ['OpenLDAP e FreeIPA', 'Keycloak para SSO', 'Integração Kerberos', 'SAML 2.0 e OAuth 2.0'],
  },
  {
    id: 'vpn',
    title: 'VPN',
    icon: Shield,
    color: 'from-emerald-500 to-teal-500',
    description: 'Configuração de túneis seguros para acesso remoto e interconexão de redes.',
    details: ['OpenVPN e WireGuard', 'IPSec site-to-site', 'VPN com MFA', 'Split tunneling'],
  },
  {
    id: 'email',
    title: 'E-MAIL',
    icon: Mail,
    color: 'from-pink-500 to-rose-500',
    description: 'Implementação e gerenciamento de servidores de e-mail corporativo.',
    details: ['Postfix e Dovecot', 'Zimbra Collaboration', 'SPF, DKIM e DMARC', 'Migração de caixas postais'],
  },
  {
    id: 'antispam',
    title: 'ANTISPAM',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    description: 'Proteção contra spam, phishing e ameaças por e-mail.',
    details: ['SpamAssassin e Rspamd', 'Greylisting e RBL', 'Quarentena e relatórios', 'Machine learning para detecção'],
  },
  {
    id: 'storage',
    title: 'STORAGE',
    icon: Database,
    color: 'from-cyan-500 to-sky-500',
    description: 'Soluções de armazenamento escaláveis e de alta disponibilidade.',
    details: ['Ceph e GlusterFS', 'NFS e Samba/CIFS', 'iSCSI e Fibre Channel', 'ZFS e LVM'],
  },
  {
    id: 'backup',
    title: 'BACKUP',
    icon: HardDrive,
    color: 'from-amber-500 to-yellow-500',
    description: 'Estratégias de backup, disaster recovery e continuidade de negócios.',
    details: ['Bacula e Bareos', 'Restic e Borg', 'Backup em nuvem (S3)', 'Testes de restauração'],
  },
  {
    id: 'dhcp',
    title: 'DHCP',
    icon: Network,
    color: 'from-lime-500 to-green-500',
    description: 'Gerenciamento dinâmico de endereços IP e integração com DNS.',
    details: ['ISC DHCP e Kea', 'Failover e redundância', 'Reservas e pools', 'DDNS integration'],
  },
  {
    id: 'networks',
    title: 'REDES e WIFI',
    icon: Network,
    color: 'from-indigo-500 to-blue-500',
    description: 'Projeto e implementação de infraestrutura de rede.',
    details: ['VLANs e roteamento', 'Switches gerenciáveis', 'Access Points enterprise', 'RADIUS/802.1X'],
  },
  {
    id: 'virtualization',
    title: 'VIRTUALIZAÇÃO',
    icon: Container,
    color: 'from-purple-500 to-violet-500',
    description: 'Plataformas de virtualização e containerização.',
    details: ['VMware vSphere/ESXi', 'Proxmox VE', 'KVM/QEMU/libvirt', 'Docker e Kubernetes'],
  },
  {
    id: 'cloud',
    title: 'CLOUD',
    icon: Cloud,
    color: 'from-sky-400 to-cyan-500',
    description: 'Arquitetura e gerenciamento de ambientes em nuvem.',
    details: ['AWS (EC2, S3, RDS)', 'Google Cloud Platform', 'OpenStack private cloud', 'Terraform IaC'],
  },
  {
    id: 'development',
    title: 'DESENVOLVIMENTO',
    icon: Code2,
    color: 'from-green-500 to-emerald-500',
    description: 'Automação, scripts e ferramentas de DevOps.',
    details: ['Shell Script (Bash)', 'Python para automação', 'GitLab CI/CD', 'Jenkins pipelines'],
  },
  {
    id: 'monitoring',
    title: 'MONITORAMENTO',
    icon: Activity,
    color: 'from-orange-500 to-amber-500',
    description: 'Observabilidade e alertas para infraestrutura.',
    details: ['Zabbix e Nagios', 'Prometheus + Grafana', 'ELK Stack', 'Alertmanager'],
  },
  {
    id: 'documentation',
    title: 'DOCUMENTAÇÃO',
    icon: FileText,
    color: 'from-slate-400 to-gray-500',
    description: 'Documentação técnica e gestão do conhecimento.',
    details: ['Wiki e Confluence', 'Runbooks e playbooks', 'Diagramas de rede', 'Políticas e procedimentos'],
  },
]

const openId = ref<string | null>('dns')

const toggleActivity = (id: string) => {
  openId.value = openId.value === id ? null : id
}

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([entry]) => {
  if (entry && entry.isIntersecting) isVisible.value = true
}, { rootMargin: '-100px' })
</script>
