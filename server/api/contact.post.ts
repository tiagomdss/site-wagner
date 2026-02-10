import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, subject, message } = body

  if (!name || !email || !subject || !message) {
    throw createError({
      statusCode: 400,
      message: 'Campos obrigatórios faltando (Nome, Email, Assunto, Mensagem)',
    })
  }

  const config = useRuntimeConfig()

  if (!config.resendApiKey) {
    throw createError({
      statusCode: 500,
      message: 'Servidor não configurado para envio de emails (API Key ausente)',
    })
  }

  const resend = new Resend(config.resendApiKey)

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Usar domínio verificado em produção
      to: [config.contactEmail],
      replyTo: email,
      subject: `[Contato Site] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; color: #1f2937; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .card { background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
              .header { text-align: center; margin-bottom: 32px; }
              .icon-circle { width: 48px; height: 48px; background-color: #eff6ff; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; color: #3b82f6; font-size: 24px; }
              .title { font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 8px; letter-spacing: -0.025em; }
              .subtitle { color: #6b7280; font-size: 14px; margin: 0; }
              .section { margin-bottom: 24px; }
              .label { color: #3b82f6; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; display: block; }
              .value-box { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
              .user-info { display: flex; align-items: center; gap: 12px; }
              .avatar { width: 36px; height: 36px; background-color: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #6b7280; font-weight: 600; font-size: 14px; }
              .user-details { display: flex; flex-direction: column; }
              .user-name { font-weight: 600; color: #111827; font-size: 14px; }
              .user-email { color: #6b7280; font-size: 12px; }
              .message-content { color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
              .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; }
              .brand { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 8px; }
              .brand-icon { width: 20px; height: 20px; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold; }
              .brand-name { font-weight: 700; color: #111827; font-size: 12px; letter-spacing: 0.05em; }
              .copyright { color: #9ca3af; font-size: 11px; margin: 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <div class="header">
                  <div class="icon-circle">✉️</div>
                  <h1 class="title">Novo Contato do Site</h1>
                  <p class="subtitle">Você recebeu uma nova mensagem através do seu formulário de contato.</p>
                </div>

                <div class="section">
                  <span class="label">Remetente</span>
                  <div class="value-box">
                    <div class="user-info">
                      <div class="avatar">${name.charAt(0).toUpperCase()}</div>
                      <div class="user-details">
                        <span class="user-name">${name}</span>
                        <span class="user-email">${email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="section">
                  <span class="label">Assunto</span>
                  <div class="value-box">
                    <div class="message-content" style="font-weight: 500;">${subject}</div>
                  </div>
                </div>

                <div class="section">
                  <span class="label">Mensagem</span>
                  <div class="value-box">
                    <div class="message-content">${message}</div>
                  </div>
                </div>

                <div class="footer">
                  <div class="brand">
                    <div class="brand-icon">⚡</div>
                    <span class="brand-name">WC PORTFOLIO</span>
                  </div>
                  <p class="copyright">Enviado via Resend API • © ${new Date().getFullYear()} Wagner Calazans</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (data.error) {
      console.error('Resend Error:', data.error)
      throw createError({
        statusCode: 500,
        message: `Erro ao enviar email: ${data.error.message}`,
      })
    }

    return { success: true, id: data.data?.id }
  } catch (error: any) {
    console.error('Email Send Error:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Erro interno ao processar envio',
    })
  }
})
