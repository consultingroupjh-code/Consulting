import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { caseFilters, caseStudies } from '../data/content.js'

export default function CaseStudies() {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? caseStudies : caseStudies.filter((c) => c.categories.includes(filter))

  return (
    <section id="casos-de-estudio" className="w-full bg-surface-container-low py-space-xl lg:py-24">
      <div className="max-w-[1320px] mx-auto page-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
          <div className="flex flex-col gap-space-xs">
            <span className="eyebrow">Resultados Tangibles</span>
            <h2 className="section-title">Casos de estudio recientes</h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-container-highest/60 rounded-3xl sm:rounded-full w-fit">
            {caseFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={
                  filter === f.id
                    ? 'px-space-md py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md font-bold shadow-sm'
                    : 'px-space-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors'
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter-desktop">
          {visible.map((item) => (
            <article
              key={item.title}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="h-56 relative overflow-hidden bg-surface-container-high">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 px-space-sm py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold">
                  {item.badge}
                </div>
              </div>
              <div className="p-space-lg flex flex-col justify-between flex-1 gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <span className="font-label-sm text-label-sm text-secondary font-bold">{item.tag}</span>
                  <h3 className="font-title-lg text-title-lg font-bold text-on-surface">{item.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{item.text}</p>
                </div>
                <div className="pt-space-sm border-t border-surface-container-low flex items-center justify-between">
                  <div>
                    <span className={`font-headline-sm text-headline-sm font-black ${item.metricColor}`}>{item.metric}</span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{item.metricLabel}</p>
                  </div>
                  <a
                    className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-bold hover:underline"
                    href="#contacto-diagnostico"
                  >
                    Ver Proyecto <Icon name="arrow_outward" className="text-[16px]" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
