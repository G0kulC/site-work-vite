import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Menu, X, Mail, MessageCircle } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { navigation, site } from '@/lib/site'

export function Brand({ light = false }: { light?: boolean }) {
  return <a href="#home" className={cn('brand', light && 'brand-light')} aria-label="Sago Techz home">
    {site.logo ? <img src={site.logo} alt="Sago Techz" width={150} height={44} /> : <span className="brand-name">sago<span>techz</span><span className="brand-dot">.</span></span>}
    <span className="brand-tagline">IDEAS → CODE → IMPACT</span>
  </a>
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])

  return <header className={cn('site-header', scrolled && 'is-scrolled')} data-ready={ready}>
    <div className={cn('container nav-inner', scrolled && 'liquid-glass')}>
      <Brand />
      <nav aria-label="Main navigation" className="desktop-nav">{navigation.map(item => <a key={item.label} href={item.href}>{item.label}</a>)}</nav>
      <a href="#contact" className={cn(buttonVariants({ variant: 'brand', size: 'nav' }), 'nav-cta')}>Let&apos;s Talk <ArrowUpRight data-icon="inline-end" /></a>
      <Button className="mobile-toggle" variant="ghost" size="icon-lg" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    <AnimatePresence>{open && <motion.nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav liquid-glass" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
      <div>{navigation.map((item, i) => <a key={item.label} href={item.href} onClick={() => setOpen(false)}><span className="nav-number">0{i + 1}</span>{item.label}<ArrowUpRight size={17} /></a>)}</div>
    </motion.nav>}</AnimatePresence>
  </header>
}

export function Footer() {
  const socialIcons = { linkedin: 'LinkedIn', github: 'GitHub', instagram: 'Instagram' }
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-brand"><Brand light /><p>Small team. Big ideas.<br />Serious technology.</p><span className="footer-note">AI, software &amp; automation for businesses across Tamil Nadu and India.</span></div>
      <div><h3>Explore</h3><a href="#about">Company</a><a href="#services">Services</a><a href="#solutions">Solutions</a><a href="#projects">Projects</a><a href="#faq">FAQ</a></div>
      <div><h3>What we do</h3><a href="#services">AI & Generative AI</a><a href="#services">Custom Software</a><a href="#services">Intelligent Automation</a><a href="#services">Cloud & Integrations</a></div>
      <div><h3>Let&apos;s connect</h3><a href="#contact">Start a conversation <ArrowUpRight size={14} /></a>{site.email && <a href={`mailto:${site.email}`}><Mail size={14} />{site.email}</a>}{site.whatsapp && <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} />WhatsApp</a>}<div className="social-links">{Object.entries(site.socials).filter(([, url]) => url).map(([name, url]) => <a href={url!} key={name} target="_blank" rel="noopener noreferrer">{socialIcons[name as keyof typeof socialIcons]}<ArrowUpRight size={13} /></a>)}</div><a href="#home" className="back-to-top">Back to top <ArrowRight size={14} /></a></div>
    </div>
    <div className="container footer-bottom"><span>© 2026 Sago Techz Pvt. Ltd. All rights reserved.</span><span>Ideas <i>→</i> Code <i>→</i> Impact</span><span className="footer-status"><span />Building what&apos;s next.</span></div>
  </footer>
}
