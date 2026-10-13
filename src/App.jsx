import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CaseStudy from './components/CaseStudy'
import Engineering from './components/Engineering'
import AboutAndProjects from './components/AboutAndProjects'
import ResumeSection from './components/ResumeSection'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CaseStudy />
        <Engineering />
        <AboutAndProjects />
        <ResumeSection />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
