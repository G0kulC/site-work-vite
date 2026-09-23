import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, AudioLines, Bot, BrainCircuit, ChartNoAxesCombined, Check, Database, FileInput, Network, Sparkles, Workflow, Zap } from 'lucide-react'
import { Reveal } from './motion'
import { cn } from '@/lib/utils'
import { AnimatedBeam } from '@/components/ui/animated-beam'

const stages = [
  { name: 'Input', icon: FileInput, heading: 'It starts with your world.', text: 'Documents, conversations, and business data become the starting point for something smarter.', sample: 'Your knowledge, connected', iconSmall: Database },
  { name: 'Understand', icon: BrainCircuit, heading: 'Context makes the difference.', text: 'Ground AI in the right knowledge, so it understands your language, your processes, and your business.', sample: 'Relevant context, retrieved', iconSmall: Network },
  { name: 'Process', icon: CpuIcon, heading: 'Intelligence with a purpose.', text: 'Purpose-built models and carefully designed logic turn unstructured information into useful answers.', sample: 'Complexity, made clear', iconSmall: Sparkles },
  { name: 'Automate', icon: Workflow, heading: 'Less busywork. More possibility.', text: 'Connect insights to action. Move work forward with dependable workflows and human oversight where it matters.', sample: 'The next step, taken care of', iconSmall: Zap },
  { name: 'Insight', icon: ChartNoAxesCombined, heading: 'From information to impact.', text: 'Give your team clear, actionable insights to make informed decisions and keep improving.', sample: 'A clearer picture of what’s next', iconSmall: Check },
]
// Chips on the left feed into the core; chips on the right carry results out.
const capabilities = [
  { name: 'AI Agent', Icon: Bot, flowsOut: false, curvature: -30 },
  { name: 'RAG', Icon: Database, flowsOut: true, curvature: -40 },
  { name: 'LLM', Icon: BrainCircuit, flowsOut: false, curvature: 0 },
  { name: 'Automation', Icon: Workflow, flowsOut: false, curvature: 30 },
  { name: 'Analytics', Icon: ChartNoAxesCombined, flowsOut: true, curvature: 40 },
  { name: 'Voice AI', Icon: AudioLines, flowsOut: true, curvature: 0 },
]

function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const chipRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  return <div className="ai-capabilities" ref={containerRef}>
    <div className="capability-orbit" aria-hidden="true" />
    {capabilities.map((item, i) => <AnimatedBeam key={item.name} containerRef={containerRef} fromRef={item.flowsOut ? centerRef : chipRefs[i]} toRef={item.flowsOut ? chipRefs[i] : centerRef} curvature={item.curvature} duration={4} delay={i * 0.45} pathColor="#5fb3c9" pathOpacity={0.22} pathWidth={2} gradientStartColor="#3be3f0" gradientStopColor="#7f9bff" />)}
    <div className="ai-center" ref={centerRef}><BrainCircuit size={31} /><span>Intelligence<br /><strong>at the core.</strong></span></div>
    {capabilities.map(({ name, Icon }, i) => <div ref={chipRefs[i]} className={`ai-chip chip-${i} liquid-glass liquid-glass-dark`} key={name}><Icon size={16} /><span>{name}</span><span className="chip-dot" /></div>)}
  </div>
}

function CpuIcon({ size = 24 }: { size?: number }) { return <Sparkles size={size} /> }

export function AIExperience() {
  const [active, setActive] = useState(1)
  const stage = stages[active]
  return <section id="solutions" className="ai-section section-space"><div className="ai-grid-bg" aria-hidden="true" /><div className="container ai-content"><Reveal className="section-heading"><div><span className="eyebrow light-eyebrow"><span />INTELLIGENCE IN MOTION</span><h2>AI that works <span className="cyan-text">with you.</span></h2></div><p>Not just artificial intelligence.<br />A real advantage for your business.</p></Reveal><Reveal><div className="workflow" role="tablist" aria-label="Explore the AI workflow">{stages.map((item, i) => <button key={item.name} role="tab" id={`stage-${i}`} aria-selected={active === i} aria-controls="workflow-panel" tabIndex={active === i ? 0 : -1} className={cn('workflow-step', active === i && 'is-active', i < active && 'is-complete')} onClick={() => setActive(i)} onKeyDown={event => {
    const next = event.key === 'ArrowRight' ? (i + 1) % stages.length : event.key === 'ArrowLeft' ? (i + stages.length - 1) % stages.length : event.key === 'Home' ? 0 : event.key === 'End' ? stages.length - 1 : null
    if (next !== null) { event.preventDefault(); setActive(next); document.getElementById(`stage-${next}`)?.focus() }
  }}><span className="workflow-number">0{i + 1}</span><span className="workflow-node"><item.icon size={25} /></span><span className="workflow-name">{item.name}</span>{i < stages.length - 1 && <span className="workflow-connector" aria-hidden="true"><ArrowRight size={12} /></span>}</button>)}</div></Reveal><div className="ai-detail-grid"><div className="ai-detail" id="workflow-panel" role="tabpanel" aria-labelledby={`stage-${active}`} tabIndex={0}><AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}><span className="detail-label">THE POSSIBILITIES, CONNECTED</span><h3>{stage.heading}</h3><p>{stage.text}</p><span className="ai-sample"><stage.iconSmall size={15} />{stage.sample}</span></motion.div></AnimatePresence><a href="#contact" className="text-link">Build your AI advantage <ArrowUpRight size={16} /></a></div><Capabilities /></div><div className="ai-bottom-note"><span className="status-dot" />YOUR DATA. YOUR WORKFLOWS. YOUR POSSIBILITIES.<span>EXPLORE THE WORKFLOW ABOVE <ArrowUpRight size={12} /></span></div></div></section>
}
