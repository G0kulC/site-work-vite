import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowRight, ArrowUpRight, Boxes, BrainCircuit, Check, Code2, Compass, Database, HeartHandshake, Lightbulb, PartyPopper, Rocket, ShieldCheck, Sparkles, Target, TrendingUp } from 'lucide-react'
import { Reveal } from './motion'
import { cn } from '@/lib/utils'
import { Brand } from './navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { site } from '@/lib/site'
import { BorderBeam } from '@/components/ui/border-beam'
import { Marquee } from '@/components/ui/marquee'
import { WordRotate } from '@/components/ui/word-rotate'

const reasons = [
  { icon: Code2, title: 'Built by Engineers', text: 'Practical technology built with real engineering experience.' },
  { icon: BrainCircuit, title: 'AI First', text: 'We use modern AI technologies to create smarter solutions.' },
  { icon: Target, title: 'Business Focused', text: 'We focus on solving business problems, not simply writing code.' },
  { icon: Boxes, title: 'Built to Scale', text: 'Solutions designed with maintainability, security and scalability in mind.' },
]
const steps = [
  { name: 'Discover', icon: Compass, text: 'Understand the business problem.', detail: 'We listen first. Together, we map your goals, understand your users, and define what a successful outcome looks like.', deliverable: 'A shared understanding and clear project scope' },
  { name: 'Design', icon: Lightbulb, text: 'Plan the solution and experience.', detail: 'We turn what we learn into an actionable plan: the right architecture, thoughtful user journeys, and a clear direction before development begins.', deliverable: 'Solution architecture and experience design' },
  { name: 'Build', icon: Code2, text: 'Develop and integrate the technology.', detail: 'We build in focused iterations, keeping you close to the work with regular demos, transparent decisions, and room to adapt.', deliverable: 'Working software, delivered incrementally' },
  { name: 'Test', icon: ShieldCheck, text: 'Validate quality and performance.', detail: 'We validate the important journeys, challenge edge cases, and review security and performance against the requirements we agreed on.', deliverable: 'A validated solution with documented checks' },
  { name: 'Launch', icon: Rocket, text: 'Deploy and monitor the solution.', detail: 'We prepare for a confident release with deployment planning, observability, and the documentation your team needs to take ownership.', deliverable: 'A live product and a practical handover' },
  { name: 'Grow', icon: TrendingUp, text: 'Improve and scale continuously.', detail: 'Real usage guides the next chapter. We help you learn from feedback, prioritize improvements, and evolve your technology alongside your business.', deliverable: 'An informed roadmap for what comes next' },
]

export function WhyUs() {
  return <section className="why-section section-space"><div className="container"><Reveal className="section-heading"><div><span className="eyebrow"><span />THE SAGO DIFFERENCE</span><h2>Good people.<br /><span className="muted-heading">Serious engineering.</span></h2></div><p>Why Sago Techz? Because the right partner<br className="desktop-break" /> makes all the difference.</p></Reveal><div className="reasons-grid">{reasons.map(({ icon: Icon, title, text }, i) => <Reveal key={title} delay={i * 0.07}><article className="reason-card"><div className="reason-top"><span>0{i + 1}</span><Icon size={24} strokeWidth={1.5} /></div><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div></div></section>
}

// Scroll phases: one per step, plus a final "built successfully" phase.
const processPhases = steps.length + 1

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => setActive(Math.min(processPhases - 1, Math.max(0, Math.floor(p * processPhases)))))
  const done = active >= steps.length
  const current = steps[Math.min(active, steps.length - 1)]
  const CurrentIcon = current.icon

  useEffect(() => {
    if (!done) return
    const colors = ['#2167e8', '#22b573', '#17b6be', '#ffc94d']
    const shared = { particleCount: 70, spread: 70, startVelocity: 48, colors, disableForReducedMotion: true }
    confetti({ ...shared, angle: 60, origin: { x: 0.1, y: 0.75 } })
    confetti({ ...shared, angle: 120, origin: { x: 0.9, y: 0.75 } })
  }, [done])

  // Clicking a step scrolls to that step's phase so scroll position and state stay in sync.
  const goTo = (phase: number) => {
    const section = sectionRef.current
    if (!section) return
    const scrollable = section.offsetHeight - window.innerHeight
    const top = section.getBoundingClientRect().top + window.scrollY + ((phase + 0.5) / processPhases) * scrollable
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return <section id="process" ref={sectionRef} className="process-section process-scroll">
    <div className="process-sticky"><div className="container">
      <Reveal className="center-heading"><span className="eyebrow"><span />A CLEAR PATH FORWARD</span><h2>Big ideas. <span className="muted-heading">Thoughtful process.</span></h2><p>From the first conversation to what comes next. We&apos;re with you.</p></Reveal>
      <AnimatePresence mode="wait" initial={false}>
        {!done ? <motion.div key="steps" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
          <div className="process-timeline" aria-label="Our process">
            <span className="process-line-fill" style={{ transform: `scaleX(${active / (steps.length - 1)})` }} aria-hidden="true" />
            {steps.map((step, i) => <button key={step.name} className={cn('process-step', active === i && 'is-active', i < active && 'is-done')} aria-current={active === i ? 'step' : undefined} aria-controls="process-detail" onClick={() => goTo(i)}><span className="process-node">{i < active ? <Check size={18} strokeWidth={2.6} /> : `0${i + 1}`}</span><h3>{step.name}</h3><p>{step.text}</p></button>)}
          </div>
          <div className="process-detail liquid-glass refract" id="process-detail" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} className="process-detail-body" initial={{ opacity: 0, filter: 'blur(4px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: 'blur(4px)' }} transition={{ duration: 0.25 }}>
                <span className="process-detail-icon"><CurrentIcon size={23} /></span><div><span className="detail-label">0{active + 1} / {current.name.toUpperCase()}</span><p>{current.detail}</p></div><span className="process-deliverable"><Check size={15} />{current.deliverable}</span>
              </motion.div>
            </AnimatePresence>
            {/* Outside the keyed content so the beams keep looping the full border across step changes. */}
            <BorderBeam size={110} duration={8} colorFrom="#2167e8" colorTo="#17b6be" borderWidth={1.5} />
            <BorderBeam size={110} duration={8} delay={4} colorFrom="#17b6be" colorTo="#22b573" borderWidth={1.5} />
          </div>
        </motion.div>
          : <motion.div key="success" className="process-success" aria-live="polite" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <motion.span className="process-success-icon" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}><PartyPopper size={34} /></motion.span>
            <h3>We built it successfully.</h3>
            <p>From discovery to growth, every step is complete. Your product is live and we&apos;re still here as it grows.</p>
            <ul className="process-success-steps">{steps.map((step, i) => <motion.li key={step.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.07 }}><Check size={13} strokeWidth={2.8} />{step.name}</motion.li>)}</ul>
            <BorderBeam size={160} duration={6} colorFrom="#22b573" colorTo="#17b6be" borderWidth={2} />
            <div className="process-success-actions"><a href="#contact" className={buttonVariants()}>Start your project <ArrowRight size={15} /></a><Button variant="outline" onClick={() => goTo(0)}>Replay the journey</Button></div>
          </motion.div>}
      </AnimatePresence>
    </div></div>
  </section>
}

export function Story() {
  return <section id="about" className="story-section section-space"><div className="container story-grid"><Reveal className="story-image-wrap"><img src="/images/builders-workspace.png" loading="lazy" decoding="async" alt="Illustrative scene of engineers collaborating around a laptop and project notes" width={1536} height={1024} sizes="(max-width: 767px) 100vw, 50vw" className="story-image" /><span className="story-image-caption">THE SPIRIT OF BUILDING TOGETHER · ILLUSTRATIVE IMAGE</span><div className="story-image-note liquid-glass"><HeartHandshake size={27} strokeWidth={1.4} /><div>Friends first.<br /><strong>Builders, always.</strong></div><span className="status-dot" /></div></Reveal><Reveal className="story-copy"><span className="eyebrow"><span />OUR STORY</span><h2>Not just a team.<br /><span className="gradient-text">A group of builders.</span></h2><p className="story-lead">Sago Techz started with a simple idea —<br />build technology together.</p><p>We are a team of friends who share a passion for technology, problem solving and innovation. What started as a small group working on projects together is growing into a technology company focused on building meaningful digital products.</p><p>We work virtually. We think collaboratively. And we care deeply about what we put into the world.</p><div className="story-signoff"><Brand /><span>Different minds.<br />One shared ambition.</span></div></Reveal></div></section>
}

const technologies = [
  { name: 'Python', slug: 'python', variant: 'mono', use: 'Intelligence & automation' },
  { name: 'FastAPI', slug: 'fastapi', variant: 'mono', use: 'High-performance APIs' },
  { name: 'Django', slug: 'django', variant: 'mono', use: 'Robust business platforms' },
  { name: 'React', slug: 'react', variant: 'mono', use: 'Thoughtful interfaces' },
  { name: 'Next.js', slug: 'nextjs', variant: 'default', use: 'Modern web experiences' },
  { name: 'TypeScript', slug: 'typescript', variant: 'mono', use: 'Reliable application code' },
  { name: 'PostgreSQL', slug: 'postgresql', variant: 'mono', use: 'Structured business data' },
  { name: 'Docker', slug: 'docker', variant: 'mono', use: 'Consistent deployments' },
  { name: 'AWS', slug: 'aws', variant: 'mono', use: 'Scalable cloud foundations' },
  { name: 'OpenAI', slug: 'openai', variant: 'default', use: 'Applied generative AI' },
  { name: 'LLMs', slug: null, variant: '', use: 'Language intelligence' },
  { name: 'Vector Databases', slug: null, variant: '', use: 'Context & semantic search' },
]

function TechPill({ tech }: { tech: (typeof technologies)[number] }) {
  return <div className="tech-pill liquid-glass">{tech.slug ? <img src={`https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${tech.slug}/${tech.variant}.svg`} alt="" width={30} height={30} loading="lazy" /> : tech.name === 'LLMs' ? <BrainCircuit /> : <Database />}<div><strong>{tech.name}</strong><span>{tech.use}</span></div></div>
}

export function TechStack() {
  const half = Math.ceil(technologies.length / 2)
  return <section className="tech-section section-space"><div className="container"><Reveal className="center-heading"><span className="eyebrow"><span />THE RIGHT TOOLS. THE RIGHT SOLUTIONS.</span><h2>Modern stack. <span className="muted-heading">Lasting foundations.</span></h2><p>We choose technology for your challenge. Not the other way around.</p></Reveal></div>
    <ul className="sr-only">{technologies.map(tech => <li key={tech.name}>{tech.name}: {tech.use}</li>)}</ul>
    <Reveal className="tech-marquee"><div aria-hidden="true">
      <Marquee pauseOnHover className="[--duration:38s] [--gap:1.1rem]">{technologies.slice(0, half).map(tech => <TechPill key={tech.name} tech={tech} />)}</Marquee>
      <Marquee reverse pauseOnHover className="[--duration:38s] [--gap:1.1rem]">{technologies.slice(half).map(tech => <TechPill key={tech.name} tech={tech} />)}</Marquee>
    </div></Reveal>
  </section>
}

export function Contact() {
  const [showDetails, setShowDetails] = useState(false)
  return <section id="contact" className="contact-section"><div className="container"><div className="contact-box"><div className="contact-orbits" aria-hidden="true"><i /><i /><i /><i /></div><Reveal className="contact-content"><span className="eyebrow light-eyebrow"><span />THE NEXT BIG THING STARTS WITH A CONVERSATION</span><h2>Have an idea?<br />Let&apos;s <WordRotate className="word-rotate" words={['build it.', 'launch it.', 'scale it.']} duration={2600} /></h2><p>Tell us what you&apos;re trying to build. We&apos;ll help turn<br className="desktop-break" /> the idea into a practical technology solution.</p><div className="contact-actions">{site.email ? <a href={`mailto:${site.email}?subject=${encodeURIComponent('Let’s build something — Project enquiry')}`} className={buttonVariants({ variant: 'white', size: 'hero' })}>Start a Conversation <ArrowUpRight data-icon="inline-end" /></a> : <Button variant="white" size="hero" onClick={() => setShowDetails(true)} aria-expanded={showDetails} aria-controls="contact-information">Start a Conversation <ArrowUpRight data-icon="inline-end" /></Button>}{site.email ? <a href={`mailto:${site.email}?subject=${encodeURIComponent('Free consultation request')}`} className="contact-secondary">Get a Free Consultation <ArrowRight size={16} /></a> : <button className="contact-secondary" onClick={() => setShowDetails(true)} aria-expanded={showDetails} aria-controls="contact-information">Get a Free Consultation <ArrowRight size={16} /></button>}</div>{showDetails && <div id="contact-information" className="contact-information" role="status"><Sparkles size={19} /><p>Good things are taking shape. Our direct contact details will be available here soon.</p></div>}<div className="contact-reassurance"><span><Check size={13} />No pressure. Just possibilities.</span><span><Check size={13} />Engineers, not sales pitches.</span></div></Reveal><span className="contact-corner">IDEAS → CODE → IMPACT</span><BorderBeam size={260} duration={9} colorFrom="#6ed5df" colorTo="#2167e8" borderWidth={1.5} /></div></div></section>
}
