import Icon from '../components/Icon.jsx'
import { faqs } from '../data/content.js'

export default function Faq() {
  return (
    <section id="preguntas-frecuentes" className="w-full page-x py-space-xl lg:py-24 max-w-[1320px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
        <div className="lg:col-span-4 flex flex-col gap-space-sm">
          <span className="eyebrow">Transparencia Total</span>
          <h2 className="section-title">Preguntas Frecuentes</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Todo lo que necesitas saber antes de iniciar una colaboración estratégica con Nexus Digital.
          </p>
          <div className="pt-space-md">
            <a
              className="inline-flex items-center gap-space-xs font-label-md text-label-md font-bold text-secondary"
              href="#contacto-diagnostico"
            >
              ¿Tienes otra duda específica? Contáctanos <Icon name="arrow_forward" className="text-[16px]" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-space-md">
          {faqs.map((faq) => (
            <div key={faq.q} className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between gap-space-md">
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface">{faq.q}</h3>
                <Icon name="check_circle" className="text-secondary shrink-0" />
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
