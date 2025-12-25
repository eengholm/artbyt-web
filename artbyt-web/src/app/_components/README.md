# Components Structure

This directory contains all reusable React components for the ArtByT web application, organized by feature and purpose.

## Directory Structure

```
_components/
├── ui/                          # Reusable UI primitives
│   ├── alert.tsx               # Alert/notification component
│   ├── avatar.tsx              # User avatar display
│   ├── container.tsx           # Layout container wrapper
│   ├── loading-spinner.tsx     # Loading state indicator
│   ├── error-message.tsx       # Error display component
│   ├── section-separator.tsx   # Visual section divider
│   └── index.ts               # Barrel export
│
├── layout/                      # Layout & navigation components
│   ├── header.tsx              # Site header with logo
│   ├── footer.tsx              # Site footer
│   ├── menu.tsx                # Navigation menu
│   ├── intro.tsx               # Hero/intro section
│   └── index.ts               # Barrel export
│
├── assignments/                 # Assignment-specific components
│   ├── assignment-body.tsx     # Assignment content display
│   ├── assignment-gallery.tsx  # Assignment image gallery
│   ├── assignment-header.tsx   # Assignment page header
│   ├── assignment-preview.tsx  # Assignment card preview
│   ├── assignment-testimonial.tsx  # Testimonial display
│   ├── assignment-title.tsx    # Assignment title component
│   ├── featured-assignment.tsx # Featured assignment showcase
│   ├── more-assignments.tsx    # Related assignments list
│   ├── index/                  # Index-specific components
│   │   └── assignment.tsx
│   └── index.ts               # Barrel export
│
├── portfolio/                   # Portfolio-specific components
│   ├── portfolio-scroll.tsx    # Portfolio image scroller
│   └── index.ts               # Barrel export
│
├── media/                       # Media & image components
│   ├── cover-image.tsx         # Responsive cover images
│   ├── image-gallery.tsx       # Image gallery grid
│   ├── date-formatter.tsx      # Date display formatter
│   └── index.ts               # Barrel export
│
├── forms/                       # Form components
│   ├── create-assignment-form.tsx
│   └── index.ts               # Barrel export
│
├── seo/                         # SEO & metadata components
│   ├── structured-data.tsx     # JSON-LD structured data
│   └── index.ts               # Barrel export
│
└── shared/                      # Other shared components
    ├── testimonials.tsx        # Testimonials section
    ├── markdown-styles.module.css  # Markdown styling
    └── index.ts               # Barrel export
```

## Import Guidelines

### Using Barrel Exports (Recommended)

Import multiple components from a category using the index files:

```tsx
// ✅ Good - Clean barrel imports
import { Container, Alert, ErrorMessage } from "@/app/_components/ui";
import { Header, Footer, Intro } from "@/app/_components/layout";
import {
  AssignmentBody,
  AssignmentHeader,
} from "@/app/_components/assignments";
```

### Direct Imports

You can also import components directly when needed:

```tsx
// ✅ Also fine - Direct imports
import Container from "@/app/_components/ui/container";
import { AssignmentBody } from "@/app/_components/assignments/assignment-body";
```

### Relative Imports (Within Component Folders)

When importing components within the same category folder, use relative paths:

```tsx
// ✅ Within assignments folder
import CoverImage from "../media/cover-image";
import Avatar from "../ui/avatar";
```

## Component Categories

### UI Components (`ui/`)

Primitive, reusable UI elements that have no business logic and can be used anywhere in the app.

### Layout Components (`layout/`)

Components that define the page structure, navigation, and global layout elements.

### Assignment Components (`assignments/`)

Components specifically related to displaying and managing assignments (projects/portfolio pieces).

### Portfolio Components (`portfolio/`)

Components for the portfolio section and gallery displays.

### Media Components (`media/`)

Components for handling images, galleries, and media display formatting.

### Forms (`forms/`)

Form-related components and input handling.

### SEO Components (`seo/`)

Components that handle metadata, structured data, and SEO optimization.

### Shared Components (`shared/`)

Components that don't fit into other categories but are shared across the application.

## Best Practices

1. **Keep Components Focused**: Each component should have a single, clear responsibility
2. **Use TypeScript**: Define proper types for all component props
3. **Export Consistently**: Use named exports for components, default for utilities
4. **Avoid Circular Dependencies**: Import from sibling folders using absolute paths
5. **Update Index Files**: When adding new components, update the corresponding index.ts

## Adding New Components

1. Create the component file in the appropriate category folder
2. Add the export to the category's `index.ts` file
3. Update this README if adding a new category

## Migration Notes

This structure was implemented on December 25, 2025 to improve organization and maintainability. All imports have been updated to reflect the new structure.
