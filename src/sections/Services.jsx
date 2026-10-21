import Icon from '../components/Icon.jsx'
import { services } from '../data/content.js'

export default function Services() {
  return (
    <section id="servicios" className="w-full page-x py-space-xl lg:py-24 max-w-[1320px] mx-auto">
      <div className="flex flex-col gap-space-sm mb-space-xl">
        <div className="inline-flex items-center gap-space-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
          <span className="eyebrow">Capacidades Digitales</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <h2 className="section-title max-w-2xl">Soluciones integrales de ingeniería y mercadotecnia digital</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Ecosistemas escalables pensados para competir con ventaja competitiva en los mercados más dinámicos de
            Estados Unidos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
          >
            <div className="flex flex-col gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <Icon name={service.icon} className="text-[28px]" />
              </div>
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-secondary font-bold">{service.tag}</span>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface">{service.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{service.text}</p>
              </div>
            </div>
            <a
              className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-bold pt-space-md group-hover:gap-2 transition-all"
              href="#contacto-diagnostico"
            >
              Conoce el servicio <Icon name="arrow_forward" className="text-[16px]" />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
