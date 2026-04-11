# Components Structure

This directory contains reusable React components for the ArtByT web application.

## Directory Structure

```
_components/
├── ui/                          # Reusable UI primitives
│   ├── error-message.tsx          # Error display component
│   └── index.ts                  # Barrel export
│
├── layout/                       # Layout components
│   ├── site-nav.tsx              # Site navigation
│   └── index.ts                  # Barrel export
│
├── shop/                        # Shopping cart
│   ├── cart-context.tsx         # Cart state management
│   └── cart-link.tsx            # Cart link component
│
├── seo/                         # SEO components
│   ├── structured-data.tsx       # JSON-LD structured data
│   └── index.ts                 # Barrel export
│
├── projects/                    # Project components
│   ├── home-slideshow.tsx       # Homepage slideshow
│   └── index.ts                 # Barrel export
│
└── shared/                     # Shared styles
    └── markdown-styles.module.css
```

## Import Guidelines

Using barrel exports (recommended):

```tsx
import { ErrorMessage } from "@/app/_components/ui";
import { SiteNav } from "@/app/_components/layout";
import { cartContext, CartProvider } from "@/app/_components/shop";
```

## Component Categories

- **ui/**: Reusable UI primitives
- **layout/**: Page structure and navigation
- **shop/**: Shopping cart functionality
- **seo/**: SEO and metadata
- **projects/**: Project-specific components
- **shared/**: Shared styles

## Notes

Some top-level index files were removed to simplify the structure. Import directly from specific folders.