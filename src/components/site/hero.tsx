import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowDown, ArrowUpRight, Code2, Cpu, Layers3, Sparkles, ShieldCheck } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DotPattern } from '@/components/ui/dot-pattern'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { AuroraText } from '@/components/ui/aurora-text'
import { ShimmerButton } from '@/components/ui/shimmer-button'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(y, { stiffness: 75, damping: 25 })
  const rotateY = useSpring(x, { stiffness: 75, damping: 25 })
  return <section className="hero" id="home">
    <div className="hero-ambient" aria-hidden="true" />
    <DotPattern width={22} height={22} cr={1.1} className="hero-dots" />
    <div className="container hero-main">
      <div className="hero-copy">
        <div className="hero-eyebrow liquid-glass"><span className="status-dot" /><AnimatedShinyText shimmerWidth={140} className="mx-0 max-w-none text-[#5c778b]/80">SMALL TEAM. BIG IDEAS. SERIOUS TECHNOLOGY.</AnimatedShinyText></div>
        <h1>Turning Ideas Into<br /><AuroraText colors={['#2464e4', '#219de0', '#17b6be', '#6d5dfc']} speed={0.8} className="hero-aurora">Intelligent<br />Technology.</AuroraText></h1>
        <p>We build AI-powered software, Generative AI applications, and automation systems that help businesses across Tamil Nadu and India work smarter, faster, and more efficiently.</p>
        <div className="hero-actions"><ShimmerButton className="hero-shimmer" background="linear-gradient(120deg, #2167e8, #1d8fe0)" shimmerColor="#bfe8ff" borderRadius="12px" onClick={() => { window.location.hash = 'contact' }}>Start a Project <ArrowUpRight size={17} /></ShimmerButton><a href="#projects" className={cn(buttonVariants({ variant: 'outline', size: 'hero' }))}>Explore Our Work <ArrowRight data-icon="inline-end" /></a></div>
        <div className="hero-footnote"><span className="tiny-line" />Human ingenuity. Intelligent technology.</div>
      </div>
      <div className="hero-visual" ref={ref} onPointerMove={event => {
        if (reduced || event.pointerType !== 'mouse' || !ref.current) return
        const box = ref.current.getBoundingClientRect()
        x.set(((event.clientX - box.left) / box.width - 0.5) * 10)
        y.set(-((event.clientY - box.top) / box.height - 0.5) * 10)
      }} onPointerLeave={() => { x.set(0); y.set(0) }}>
        <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
        <span className="visual-coordinate coordinate-one" aria-hidden="true">01 — IMAGINE</span><span className="visual-coordinate coordinate-two" aria-hidden="true">BUILT FOR POSSIBILITY</span>
        <motion.div className="sculpture-wrap" style={reduced ? {} : { rotateX, rotateY }}>
          <img src="/images/technology-sculpture.png" alt="Interconnected blue and cyan glass ribbons, representing ideas becoming intelligent technology" width={1024} height={1024} fetchPriority="high" sizes="(max-width: 767px) 95vw, 54vw" className="hero-sculpture" />
        </motion.div>
        <div className="floating-card ai-float liquid-glass refract"><span className="floating-icon"><Sparkles size={18} /></span><div><strong>AI-powered</strong><span>Human-inspired.</span></div><span className="card-spark" /></div>
        <div className="floating-card scale-float liquid-glass refract"><span className="floating-icon teal-icon"><Layers3 size={18} /></span><div><strong>Built to scale</strong><span>Engineered for impact.</span></div><ArrowUpRight size={15} /></div>
        <div className="code-float liquid-glass liquid-glass-dark" aria-hidden="true"><div className="code-dots"><i /><i /><i /><span>idea_to_impact.py</span></div><code><span className="code-blue">def</span> build_the_future(idea):<br />&nbsp;&nbsp;solution = <span className="code-cyan">innovate</span>(idea)<br />&nbsp;&nbsp;<span className="code-blue">return</span> real_world_impact</code></div>
        <span className="node node-1" aria-hidden="true" /><span className="node node-2" aria-hidden="true" /><span className="node node-3" aria-hidden="true" />
      </div>
    </div>
    <div className="container hero-bottom"><a href="#intro" className="scroll-cue"><span><ArrowDown size={15} /></span>SCROLL TO EXPLORE</a><div className="hero-assurances"><span><Cpu size={15} />AI-first thinking</span><span><Code2 size={15} />Engineering-led</span><span><ShieldCheck size={15} />Built for the real world</span></div><span className="hero-edition">IDEAS → CODE → IMPACT</span></div>
  </section>
}
