import Icon from '../components/Icon.jsx'
import { trustItems } from '../data/content.js'

export default function TrustBar() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="max-w-[1320px] mx-auto page-x">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col gap-space-xs group"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <Icon name={item.icon} className="text-[24px]" />
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface">{item.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
