import Icon from '../components/Icon.jsx'

function PerformanceCard() {
  return (
    <div className="relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-xl overflow-hidden flex flex-col gap-space-md">
      <div className="flex items-center justify-between gap-space-sm pb-space-sm">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Rendimiento Consolidado
          </span>
          <span className="font-title-md text-title-md font-bold text-on-surface">Últimos 90 días • Clientes Activos</span>
        </div>
        <div className="flex items-center gap-1.5 px-space-xs py-1 rounded-full bg-surface-container-low shrink-0">
          <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse" />
          <span className="font-label-sm text-label-sm font-semibold text-on-tertiary-container">En línea</span>
        </div>
      </div>

      <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="font-display-mobile text-display-mobile font-extrabold text-on-surface tracking-tight">
              +142%
            </span>
            <p className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Crecimiento medio en prospectos calificados
            </p>
          </div>
          <span className="px-space-xs py-1 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm font-bold flex items-center gap-0.5 shrink-0">
            <Icon name="trending_up" className="text-[14px]" /> Q1/Q2
          </span>
        </div>
        <div className="w-full h-24 pt-space-xs">
          <svg className="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 300 80">
            <defs>
              <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#074ae5" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#074ae5" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 65 Q 40 55, 75 48 T 150 40 T 225 22 T 300 8 L 300 80 L 0 80 Z" fill="url(#areaGradient)" />
            <path
              d="M0 65 Q 40 55, 75 48 T 150 40 T 225 22 T 300 8"
              stroke="#074ae5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <circle className="animate-ping" cx="300" cy="8" fill="#074ae5" r="4" style={{ transformOrigin: '300px 8px' }} />
            <circle cx="300" cy="8" fill="#074ae5" r="4" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-space-sm">
        <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Optimización Técnica</span>
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">99.8%</span>
          <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold flex items-center gap-0.5">
            <Icon name="speed" className="text-[14px]" /> Lighthouse Core
          </span>
        </div>
        <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Retorno Comercial</span>
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">+3.4x</span>
          <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-0.5">
            <Icon name="payments" className="text-[14px]" /> ROI Validado
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-space-sm pt-space-xs text-on-surface-variant text-label-sm font-label-sm">
        <span className="flex items-center gap-1.5">
          <Icon name="sync" className="text-[16px] text-secondary" />
          Algoritmo de optimización activa
        </span>
        <span className="text-on-surface font-semibold">EE. UU. Market</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="inicio" className="w-full page-x py-space-xl lg:py-24 max-w-[1320px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high w-fit shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
            <span className="font-label-sm text-label-sm font-semibold text-secondary uppercase tracking-wider">
              Agencia Digital en EE. UU. • Bilingüe ES/EN
            </span>
          </div>

          <h1 className="font-display-mobile text-display-mobile md:font-display md:text-display font-extrabold text-on-surface tracking-tight md:leading-[1.08]">
            Tu negocio merece una presencia digital que genere{' '}
            <span className="text-secondary">oportunidades reales.</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Estrategias de marketing de alto impacto, experiencias web a medida y campañas publicitarias diseñadas para
            conectar con clientes y escalar con solvencia en el mercado estadounidense.
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
            <a
              className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary-container transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
              href="#contacto-diagnostico"
            >
              <Icon name="calendar_today" className="text-[20px]" />
              Agenda una consulta gratuita
            </a>
            <a
              className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:shadow-md transition-all hover:bg-surface-container-low"
              href="#servicios"
            >
              <Icon name="explore" className="text-[20px] text-secondary" />
              Explora nuestros servicios
            </a>
          </div>

          <div className="flex items-center gap-space-xs pt-space-sm text-on-surface-variant">
            <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-on-tertiary-container shrink-0">
              <Icon name="verified" className="text-[16px]" />
            </div>
            <span className="font-body-sm text-body-sm font-medium">
              Estrategia, creatividad e ingeniería en un solo equipo aliado.
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <PerformanceCard />
        </div>
      </div>
    </section>
  )
}
