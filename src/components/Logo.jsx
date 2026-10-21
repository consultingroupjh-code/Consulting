import Icon from './Icon.jsx'

export default function Logo() {
  return (
    <a className="flex items-center gap-space-xs" href="#inicio" aria-label="Nexus Digital, ir al inicio">
      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-on-secondary shadow-[0_2px_8px_-2px_rgba(16,27,51,0.04)]">
        <Icon name="terminal" className="text-[22px]" />
      </div>
      <div className="flex flex-col">
        <span className="font-title-md text-title-md font-bold tracking-tight text-on-surface">NEXUS</span>
        <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase -mt-1">DIGITAL</span>
      </div>
    </a>
  )
}
