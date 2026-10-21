import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import { navLinks } from '../data/content.js'

const sectionIds = navLinks.map((link) => link.href.slice(1))

// Resalta el enlace de la sección visible mientras se hace scroll
function useActiveSection() {
  const [active, setActive] = useState('inicio')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return active
}

export default function Header() {
  const active = useActiveSection()
  const [lang, setLang] = useState('es')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(16,27,51,0.04)]">
      <div className="h-20 w-full page-x flex items-center justify-between">
        <div className="flex items-center gap-space-lg">
          <Logo />
          <div className="hidden xl:flex items-center gap-space-xs pl-space-xs">
            <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse" />
            <span className="font-label-sm text-label-sm text-on-surface-variant">Estudio Disponible</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-space-xs p-space-xs bg-surface-container-lowest/60 rounded-full shadow-[0_1px_4px_rgba(16,27,51,0.03)]">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'font-label-md text-label-md px-space-md py-space-xs transition-colors bg-surface-container-high text-on-surface font-bold rounded-lg'
                    : 'font-label-md text-label-md px-space-md py-space-xs rounded-full text-on-surface-variant hover:text-on-surface transition-colors'
                }
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-space-md">
          <div className="flex items-center p-0.5 bg-surface-container-low rounded-full shadow-inner">
            {['es', 'en'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={
                  lang === code
                    ? 'font-label-sm text-label-sm px-space-sm py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-bold shadow-[0_1px_2px_rgba(16,27,51,0.08)]'
                    : 'font-label-sm text-label-sm px-space-sm py-0.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors'
                }
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            className="hidden sm:inline-flex items-center justify-center min-w-[140px] px-space-lg py-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary-container transition-all shadow-[0_2px_8px_-2px_rgba(16,27,51,0.04)] hover:shadow-[0_12px_32px_-4px_rgba(16,27,51,0.08)]"
            href="#contacto-diagnostico"
          >
            Agenda una consulta gratuita
          </a>
          <div className="hidden lg:flex w-8 h-8 rounded-full bg-primary items-center justify-center shrink-0">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
          <button
            type="button"
            className="lg:hidden w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="text-[22px]" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden page-x pb-space-md flex flex-col gap-space-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-label-md text-label-md px-space-md py-space-sm rounded-lg transition-colors ${
                active === link.href.slice(1)
                  ? 'bg-surface-container-high text-on-surface font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
