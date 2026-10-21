import Icon from '../components/Icon.jsx'
import { steps } from '../data/content.js'

export default function Process() {
  return (
    <section id="proceso" className="w-full page-x py-space-xl lg:py-24 max-w-[1320px] mx-auto">
      <div className="flex flex-col items-center text-center gap-space-xs mb-space-xl">
        <span className="eyebrow">Ruta de Ejecución</span>
        <h2 className="section-title">Metodología estructurada de 4 pasos</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
          Un proceso predecible, ágil y transparente que mitiga riesgos y acelera el tiempo de lanzamiento al mercado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop relative">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-sm relative"
          >
            <div className="flex items-center justify-between">
              <span className="font-display-mobile text-display-mobile font-black text-surface-container-high">
                {step.number}
              </span>
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                <Icon name={step.icon} className="text-[20px]" />
              </div>
            </div>
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">{step.phase}</span>
              <h3 className="font-title-lg text-title-lg font-bold text-on-surface">{step.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
