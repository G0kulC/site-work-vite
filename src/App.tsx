import { Navigation, Footer } from '@/components/site/navigation'
import { Hero } from '@/components/site/hero'
import { Intro, Services } from '@/components/site/services'
import { AIExperience } from '@/components/site/ai-experience'
import { Projects } from '@/components/site/projects'
import { WhyUs, Process, Story, TechStack, Contact } from '@/components/site/company'
import { LiquidGlassFilter, MotionProvider } from '@/components/site/motion'

export default function App() {
  return (
    <MotionProvider>
      <LiquidGlassFilter />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Intro />
        <Services />
        <AIExperience />
        <WhyUs />
        <Projects />
        <Process />
        <Story />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  )
}
