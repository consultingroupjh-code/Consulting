import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface">
        <Home />
      </main>
      <Footer />
    </>
  )
}
