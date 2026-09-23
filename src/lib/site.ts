export const site = {
  name: 'Sago Techz',
  legalName: 'Sago Techz Pvt. Ltd.',
  tagline: 'Ideas → Code → Impact',
  email: null as string | null,
  whatsapp: null as string | null,
  logo: null as string | null,
  socials: { linkedin: null, github: null, instagram: null } as Record<string, string | null>,
}

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Projects', href: '#projects' },
  { label: 'How We Work', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export function getSiteUrl() {
  return import.meta.env.VITE_SITE_URL ?? (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173')
}
