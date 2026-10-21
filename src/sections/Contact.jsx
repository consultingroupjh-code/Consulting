import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { budgets, leadServices } from '../data/content.js'

const benefits = [
  'Análisis de oportunidades y competidores',
  'Revisión técnica de arquitectura y SEO',
  'Plan de inversión con ROI proyectado',
]

function ContactForm() {
  const [sent, setSent] = useState(false)

  // TODO: conectar a un endpoint (/api/lead) o servicio de formularios
  function handleSubmit(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    console.info('Lead recibido', data)
    setSent(true)
    event.currentTarget.reset()
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-space-md h-full py-space-xl" role="status">
        <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-tertiary-container">
          <Icon name="check_circle" className="text-[36px]" />
        </div>
        <h3 className="font-title-lg text-title-lg font-bold text-on-surface">¡Gracias! Tu diagnóstico ha sido enviado.</h3>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Un estratega se contactará contigo en menos de 24 horas.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="font-label-md text-label-md font-bold text-secondary hover:underline"
        >
          Enviar otra solicitud
        </button>
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <h3 className="font-title-lg text-title-lg font-bold text-on-surface">Solicita tu Diagnóstico Estratégico</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Respuesta personalizada garantizada en menos de 24 horas hábiles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <div className="flex flex-col gap-1">
          <label className="form-label" htmlFor="lead_name">Nombre Completo *</label>
          <input className="form-field" id="lead_name" name="name" placeholder="Ej. Carlos Mendoza" required type="text" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="form-label" htmlFor="lead_email">Correo Profesional *</label>
          <input className="form-field" id="lead_email" name="email" placeholder="carlos@tuempresa.com" required type="email" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <div className="flex flex-col gap-1">
          <label className="form-label" htmlFor="lead_company">Nombre de la Empresa (Opcional)</label>
          <input className="form-field" id="lead_company" name="company" placeholder="Tu Empresa LLC" type="text" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="form-label" htmlFor="lead_lang">Idioma Preferido *</label>
          <select className="form-field" id="lead_lang" name="language" defaultValue="es">
            <option value="es">Español (Atención en español)</option>
            <option value="en">English (Bilingual communication)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <div className="flex flex-col gap-1">
          <label className="form-label" htmlFor="lead_service">Servicio Principal *</label>
          <select className="form-field" id="lead_service" name="service" defaultValue="web">
            {leadServices.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="form-label" htmlFor="lead_budget">Presupuesto Estimado *</label>
          <select className="form-field" id="lead_budget" name="budget" defaultValue="b2">
            {budgets.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="form-label" htmlFor="lead_message">Detalles del Proyecto o Metas *</label>
        <textarea
          className="form-field h-auto p-space-md"
          id="lead_message"
          name="message"
          placeholder="Cuéntanos brevemente sobre tus metas comerciales, clientes objetivo o problemas a resolver..."
          required
          rows={3}
        />
      </div>

      <div className="flex items-center gap-space-xs">
        <input className="w-4 h-4 rounded accent-secondary" id="lead_terms" name="terms" required type="checkbox" />
        <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="lead_terms">
          Acepto la política de privacidad y autorizo el contacto comercial de Nexus Digital.
        </label>
      </div>

      <button
        className="w-full h-12 inline-flex items-center justify-center gap-space-xs rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-container transition-all shadow-md hover:shadow-xl mt-space-xs"
        type="submit"
      >
        <Icon name="send" className="text-[20px]" />
        Enviar Diagnóstico Estratégico
      </button>
    </form>
  )
}

export default function Contact() {
  return (
    <section id="contacto-diagnostico" className="w-full page-x py-space-xl lg:py-24 max-w-[1320px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-stretch">
        <div className="lg:col-span-5 bg-primary-container text-on-primary rounded-2xl p-space-lg md:p-space-xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="flex flex-col gap-space-md relative z-10">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping" />
              <span className="font-label-sm text-label-sm text-tertiary-fixed font-semibold uppercase">Cupos Abiertos Q2 / Q3</span>
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-extrabold tracking-tight leading-tight">
              ¿Listo para llevar tu negocio al siguiente nivel digital?
            </h2>
            <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
              Agenda una llamada diagnóstica de 30 minutos sin costo. Evaluaremos tu situación actual y te entregaremos
              una propuesta técnica y estratégica adaptada a tus metas de crecimiento en EE. UU.
            </p>
            <div className="flex flex-col gap-space-sm pt-space-xs text-on-primary font-body-sm text-body-sm">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-space-xs">
                  <Icon name="check" className="text-tertiary-fixed text-[20px]" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-space-sm pt-space-xl relative z-10">
            <a
              className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary-container transition-all shadow-md"
              href="#contacto-form"
            >
              <Icon name="calendar_month" className="text-[20px]" />
              Agenda una consulta gratuita
            </a>
            <a
              className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-tertiary-container text-tertiary-fixed font-label-md text-label-md hover:bg-tertiary-container/80 transition-all shadow-sm"
              href="https://wa.me/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="chat" className="text-[20px]" />
              Escríbenos por WhatsApp Directo
            </a>
          </div>
        </div>

        <div
          id="contacto-form"
          className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-lg flex flex-col justify-between"
        >
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
