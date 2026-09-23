// Single source for search metadata. Read by the page (FAQ section) and by
// vite.config.ts, which writes the head tags and JSON-LD into index.html at build time.
// Keep this file free of React/browser imports so the Vite config can load it.

export const SITE_URL = 'https://sagotechz.in'

export const seo = {
  name: 'Sago Techz',
  legalName: 'Sago Techz Pvt. Ltd.',
  title: 'Sago Techz | AI, Software Development & Automation',
  description: 'Sago Techz builds AI software, Generative AI & RAG apps, business automation and custom web platforms for businesses across Tamil Nadu and India.',
  slogan: 'Ideas → Code → Impact',
  image: `${SITE_URL}/og-image.png`,
  imageAlt: 'Sago Techz — Turning ideas into intelligent technology. AI, software and automation.',
  logo: `${SITE_URL}/icon-512.png`,
  locale: 'en_IN',
  areaServed: ['Tamil Nadu', 'India'],
  knowsAbout: ['Artificial Intelligence', 'Generative AI', 'Large Language Models', 'Retrieval-Augmented Generation', 'AI Agents', 'Business Process Automation', 'Robotic Process Automation', 'Custom Software Development', 'Web Application Development', 'API Development', 'Cloud Integration', 'Computer Vision', 'Python', 'FastAPI', 'Django', 'React', 'Next.js'],
}

export const serviceCatalog = [
  { name: 'AI & Generative AI Development', description: 'AI-powered applications, intelligent assistants, AI agents, RAG systems, LLM integrations and custom Generative AI solutions.' },
  { name: 'Custom Software Development', description: 'Modern web, mobile and custom business applications, SaaS platforms and APIs built for performance and scalability.' },
  { name: 'Business Automation & RPA', description: 'Automation of repetitive workflows, business processes and operations with AI, APIs and robotic process automation.' },
  { name: 'AI Call Quality Analysis', description: 'AI analysis of customer conversations for quality, compliance, sentiment and actionable insights.' },
  { name: 'Meeting Intelligence', description: 'Meeting recording, transcription, summaries, decisions and action items powered by AI.' },
  { name: 'Cloud & Integrations', description: 'Cloud architecture, deployment, third-party API integrations and monitoring for scalable digital systems.' },
]

export const faqs = [
  {
    question: 'What does Sago Techz do?',
    answer: 'Sago Techz develops AI-powered software, Generative AI applications, automation systems, web platforms and custom digital products. We help businesses turn ideas into practical technology, from the first conversation to launch and beyond.',
  },
  {
    question: 'Do you build Generative AI and LLM applications?',
    answer: 'Yes. We build Generative AI applications including AI assistants, AI agents, LLM-powered tools, RAG systems, document intelligence and AI workflow automation, grounded in your own business knowledge.',
  },
  {
    question: 'What is RAG (Retrieval-Augmented Generation)?',
    answer: 'RAG connects a large language model to your own knowledge, such as documents, databases and internal wikis. Relevant information is retrieved for each question, so answers are based on your content rather than only on what the model learned in training.',
  },
  {
    question: 'Can you automate our business workflows?',
    answer: 'Yes. We map repetitive processes, find the right opportunities for automation and connect your systems with reliable workflows using APIs, AI and RPA, with human approval steps where they matter.',
  },
  {
    question: 'Do you build custom software and web applications?',
    answer: 'Yes. We build custom web applications, SaaS platforms, APIs and business systems using technologies such as Python, FastAPI, Django, React, Next.js, TypeScript and PostgreSQL, deployed on the cloud.',
  },
  {
    question: 'Which areas do you serve?',
    answer: 'We work with businesses across Tamil Nadu, including Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem and Tiruppur, and with clients elsewhere in India and abroad. We work remotely, so your location is never a barrier.',
  },
  {
    question: 'How does a project with Sago Techz start?',
    answer: 'It starts with a free conversation about the problem you want to solve. We then agree on a clear scope, design the solution with you and build it in focused iterations with regular demos.',
  },
]

export function buildJsonLd() {
  const orgId = `${SITE_URL}/#organization`
  const siteId = `${SITE_URL}/#website`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: seo.legalName,
        alternateName: seo.name,
        legalName: seo.legalName,
        url: `${SITE_URL}/`,
        logo: { '@type': 'ImageObject', url: seo.logo, width: 512, height: 512 },
        image: seo.image,
        description: seo.description,
        slogan: seo.slogan,
        areaServed: [{ '@type': 'State', name: 'Tamil Nadu' }, { '@type': 'Country', name: 'India' }],
        knowsAbout: seo.knowsAbout,
        makesOffer: serviceCatalog.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.name, description: service.description, provider: { '@id': orgId }, areaServed: seo.areaServed } })),
      },
      { '@type': 'WebSite', '@id': siteId, url: `${SITE_URL}/`, name: seo.name, publisher: { '@id': orgId }, inLanguage: 'en-IN' },
      { '@type': 'WebPage', '@id': `${SITE_URL}/#webpage`, url: `${SITE_URL}/`, name: seo.title, description: seo.description, isPartOf: { '@id': siteId }, about: { '@id': orgId }, primaryImageOfPage: seo.image, inLanguage: 'en-IN' },
      { '@type': 'FAQPage', '@id': `${SITE_URL}/#faq`, mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    ],
  }
}

export function buildHeadTags() {
  const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const url = `${SITE_URL}/`
  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="application-name" content="${seo.name}" />`,
    `<meta name="author" content="${seo.legalName}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${seo.locale}" />`,
    `<meta property="og:site_name" content="${seo.name}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:image" content="${seo.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(seo.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.image}" />`,
    `<meta name="twitter:image:alt" content="${esc(seo.imageAlt)}" />`,
    `<script type="application/ld+json">${JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}
