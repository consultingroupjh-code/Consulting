import Icon from '../components/Icon.jsx'
import { qualityBadges } from '../data/content.js'

export default function Quality() {
  return (
    <section className="w-full page-x py-space-xl max-w-[1320px] mx-auto">
      <div className="p-space-lg md:p-space-xl rounded-2xl bg-surface-container-high/40 shadow-sm flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex flex-col">
            <span className="eyebrow">Estándares Internacionales</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Compromiso de Calidad Auditable</h3>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
            Cada proyecto entregado cumple con estrictas pautas de seguridad, velocidad y accesibilidad técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
          {qualityBadges.map((badge) => (
            <div
              key={badge.title}
              className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-md"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-surface-container-low ${badge.iconColor} flex items-center justify-center shrink-0`}
              >
                <Icon name={badge.icon} className="text-[28px]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-title-md text-title-md font-bold text-on-surface">{badge.title}</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{badge.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
