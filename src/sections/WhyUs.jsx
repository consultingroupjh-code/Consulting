import Icon from '../components/Icon.jsx'
import { differentiators } from '../data/content.js'

export default function WhyUs() {
  return (
    <section id="por-que-nosotros" className="w-full bg-surface-container-low py-space-xl lg:py-24">
      <div className="max-w-[1320px] mx-auto page-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <span className="eyebrow">Alianza Estratégica</span>
            </div>
            <h2 className="section-title">Más que proveedores, somos tu socio de crecimiento digital.</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Eliminamos las falsas promesas del marketing genérico. Diseñamos sistemas comprobados de adquisición con
              ingeniería limpia, comunicación clara y foco inquebrantable en métricas de negocio reales.
            </p>
            <div className="pt-space-xs">
              <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-secondary shrink-0 font-bold text-title-md">
                  98%
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md font-bold text-on-surface">Retención de Clientes</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Relaciones de largo plazo basadas en resultados continuos.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                  <Icon name={item.icon} className="text-[24px]" />
                </div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">{item.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
