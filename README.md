# Sago Techz — Website

React + Vite + TypeScript + Tailwind CSS v4 (migrated from Next.js).

## Scripts

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # type-check and build to dist/
npm run preview  # preview the production build
```

## Notes

- Source lives in `src/`; the `@/` import alias points to `src/`.
- Static SEO files: `public/robots.txt`, `public/sitemap.xml`, `public/og-image.png`. Replace `your-domain.com` with your real domain.
- Optional env var `VITE_SITE_URL` sets the canonical site URL.
- Security headers for Vercel are in `vercel.json`.
