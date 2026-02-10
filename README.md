# ⚡ Wagner Calazans | Portfolio V2

![Nuxt 4](https://img.shields.io/badge/Nuxt-4.0-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-Email_API-black?style=for-the-badge&logo=resend&logoColor=white)

Portfolio moderno, minimalista e de alta performance desenvolvido com as tecnologias mais recentes do ecossistema Vue. Focado em **Experiência do Usuário (UX)**, **Design Responsivo** e **Performance**.

## ✨ Destaques & Features

- 🎨 **Design Premium**: Interface moderna com efeitos de Glassmorphism, gradientes suaves e tipografia refinada.
- 🌗 **Dark/Light Mode**: Sistema de temas robusto com detecção automática de preferência do sistema.
- 📱 **Totalmente Responsivo**: Layout fluido que se adapta perfeitamente a qualquer tamanho de tela (Mobile First).
- ✉️ **Formulário de Contato Funcional**: Integração com **Resend API** para envio de emails reais e template HTML estilizado.
- 🚀 **Nuxt 4 & Nitro**: Renderização Server-Side (SSR) ultrarrápida e otimizada para SEO.
- 🎭 **Animações Fluidas**: Micro-interações e transições suaves entre páginas e elementos.

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com) (Vue 3 Composition API)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com) (Oxide Engine)
- **Ícones**: [Lucide Vue Next](https://lucide.dev)
- **Email**: [Resend SDK](https://resend.com)
- **Utilitários**: VueUse

## 🚀 Como Rodar Localmente

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

1. **Clone o repositório**
   ```bash
   git clone https://github.com/tiagomdss/site-wagner.git
   cd site-wagner
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Configure as Variáveis de Ambiente**
   Crie um arquivo `.env` na raiz do projeto com suas credenciais do Resend:
   ```env
   RESEND_API_KEY=re_SuaChaveAqui...
   CONTACT_EMAIL=seu-email@dominio.com
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   pnpm dev
   ```
   O site estará disponível em `http://localhost:3000`.

## 📦 Deploy

Este projeto está pronto para ser implantado na **Vercel** ou **Netlify** com zero configuração (apenas adicione as variáveis de ambiente no painel da plataforma).

---

Desenvolvido com 💙 por **Wagner Calazans**
