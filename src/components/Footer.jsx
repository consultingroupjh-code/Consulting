import Icon from './Icon.jsx'
import { footerSolutions, navLinks, offices } from '../data/content.js'

const legalLinks = ['Política de Privacidad', 'Términos de Servicio', 'Seguridad & Cumplimiento']

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-surface-container-low mt-space-xl pt-space-xl pb-space-lg">
      <div className="w-full page-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter-desktop mb-space-xl">
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-secondary">
              <Icon name="terminal" className="text-[20px]" />
            </div>
            <span className="font-title-md text-title-md font-bold tracking-tight text-on-surface">NEXUS DIGITAL</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
            Estudio digital bilingüe de ingeniería y diseño para firmas de alto crecimiento en EE. UU. y líderes hispanos
            de alto impacto. Rendimiento, precisión y arquitectura tecnológica escalable.
          </p>
          <div className="flex items-center gap-space-xs mt-space-xs">
            <span className="w-2 h-2 rounded-full bg-on-tertiary-container" />
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">Disponibilidad Q2 / Q3 {year}</span>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-space-sm">
          <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface mb-space-xs">
            Navegación
          </span>
          {navLinks.slice(0, -1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="lg:col-span-3 flex flex-col gap-space-sm">
          <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface mb-space-xs">
            Soluciones Core
          </span>
          {footerSolutions.map((item) => (
            <span key={item} className="font-body-sm text-body-sm text-on-surface-variant">
              {item}
            </span>
          ))}
        </div>

        <div className="lg:col-span-3 flex flex-col gap-space-md">
          <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">
            Oficinas Virtuales
          </span>
          {offices.map((office) => (
            <div
              key={office.city}
              className="flex flex-col gap-space-xs p-space-md rounded-xl bg-surface-container-lowest shadow-[0_2px_8px_-2px_rgba(16,27,51,0.04)]"
            >
              <div className="flex items-center gap-space-xs">
                <Icon name={office.icon} className="text-secondary text-[18px]" />
                <span className="font-title-md text-title-md font-semibold text-on-surface">{office.city}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {office.lines[0]}
                <br />
                {office.lines[1]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-x">
        <div className="w-full px-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container-high/40 rounded-xl py-space-md">
          <p className="font-label-sm text-label-sm text-on-surface-variant text-center md:text-left">
            © {year} Nexus Digital LLC. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-space-lg">
            {legalLinks.map((label) => (
              <a
                key={label}
                href="#"
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
