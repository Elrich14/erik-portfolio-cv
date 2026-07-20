import ConstellationCanvas from './components/ConstellationCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* bottom layer: native canvas constellation (z-index: -2) */}
      <ConstellationCanvas />
      {/* film-grain texture (z-index: -1) */}
      <div className="grain" aria-hidden />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
