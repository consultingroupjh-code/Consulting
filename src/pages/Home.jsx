import Hero from '../sections/Hero.jsx'
import TrustBar from '../sections/TrustBar.jsx'
import Services from '../sections/Services.jsx'
import WhyUs from '../sections/WhyUs.jsx'
import Process from '../sections/Process.jsx'
import CaseStudies from '../sections/CaseStudies.jsx'
import Quality from '../sections/Quality.jsx'
import Faq from '../sections/Faq.jsx'
import Contact from '../sections/Contact.jsx'

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <Process />
      <CaseStudies />
      <Quality />
      <Faq />
      <Contact />
    </div>
  )
}
