# ArtByT Web

A photography portfolio website for Tim Bylander built with Next.js.

## Pages

- `/` - Homepage with slideshow
- `/about` - About page
- `/portfolio` - Portfolio gallery
- `/projects` - Project assignments listing
- `/projects/[slug]` - Individual project pages
- `/shop` - Shop listing
- `/shop/[slug]` - Shop items
- `/shop/cart` - Shopping cart

## Tech Stack

- Next.js 16 (App Router)
- TypeScript 6
- Tailwind CSS 4
- Decap CMS for content management

## Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## CMS

Admin panel at `/admin` (protected)

## Content

Projects and pages are managed via Decap CMS and stored as Markdown in `content/`.

## Structure

```
src/app/               # Next.js app router pages
src/app/_components/   # Reusable components
public/assets/         # Static assets (images, uploads)
content/              # Markdown content
```

## Deployment

Deploy to Vercel or similar. Set environment variables for CMS authentication.