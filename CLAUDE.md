# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with **Astro** showcasing various projects. The site is hosted at `https://portfolio.sashapopov.com` and deployed on Vercel.

## Development Commands

- `npm run dev` - Start development server with host access at localhost:4321
- `npm run start` - Alternative dev server start command  
- `npm run build` - Type check and build for production (outputs to ./dist/)
- `npm run preview` - Preview production build locally
- `astro check` - Run Astro's built-in type checking

## Architecture

### Data-Driven Portfolio Structure
- **Central Data Store**: `src/data.astro` contains all project information and technology stack definitions
- **Technology Stack (`t` object)**: Centralized mapping of technologies with icon names, display text, and URLs
- **Project Sections**: Array of portfolio projects with metadata, descriptions, tech stacks, and assets

### Component Architecture
- **Layout System**: Base layout in `src/layouts/Layout.astro` with global styles using Geist Sans font
- **Project Components**: Modular project section components in `src/components/projectSection/`:
  - `index.astro` - Main container with intersection observer for scroll animations  
  - `Title.astro`, `Body.astro`, `Hero.astro` - Specialized sub-components
  - `GithubButton.astro`, `LiveButton.astro` - Action buttons
  - `Tool.astro` - Technology stack display

### Styling & UX
- **Scroll-Snap Design**: Full-viewport sections with smooth scroll and snap behavior
- **Intersection Observer**: Scroll-triggered animations (blur/slide effects)
- **Responsive Design**: Mobile-first approach with breakpoints at 320px, 640px, 1025px
- **Alternating Layout**: Projects alternate between left/right alignment

### Asset Management
- **Icons**: SVG icons stored in `src/icons/` for technology stack display
- **Images**: Project hero images in `src/images/` (PNG, WebP formats)
- **Videos**: Project hero videos in `public/videos/` (MP4 format for browser compatibility)
- **Static Assets**: Public folder contains favicon, CNAME for custom domain, and video assets

### Hero Media Support
- **Dual Format Support**: Projects can use either images or videos as hero content
- **Type System**: `HeroMedia` union type in `src/types.ts` handles both formats
- **Video Features**: Autoplay, muted, looping, playsinline for mobile compatibility
- **Optional Poster**: Videos can include poster images for loading states
- **Responsive**: Both images and videos scale responsively with border-radius styling

## Key Files to Understand

- `src/data.astro` - Complete project and technology data definitions
- `src/pages/index.astro` - Main page rendering all portfolio sections
- `src/components/projectSection/index.astro` - Core project display component with animations

## Data Structure & Content Management

### Technology Stack Registry (`t` object)
- **Centralized Registry**: All technologies defined with consistent structure
- **Properties**: `iconName`, `text`, `href` for each technology
- **Sorting**: `sortedStack()` helper for alphabetical ordering
- **Extensibility**: Easy to add new technologies by extending the `t` object

### Project Sections Schema
Each project contains:
- **Metadata**: `title`, `description[]`, `repo`, `live?`
- **Visuals**: `herosrc` (ImageMetadata), alternating `side` calculation
- **Technology**: `stack[]` array referencing `t` object entries
- **Validation**: TypeScript interfaces ensure data consistency

### Content Update Workflow
1. Add new technology to `t` object in `src/data.astro`
2. Add corresponding SVG icon to `src/icons/`
3. Create project hero image in `src/images/`
4. Add project object to `sections` array
5. Deploy automatically triggers rebuild

## Component Architecture Details

### Section Component (`projectSection/index.astro`)
- **Props Interface**: Strongly typed project data structure  
- **Intersection Observer**: Viewport-based animation triggering
- **Side Calculation**: Even/odd index determines slide direction
- **Performance**: Observer cleanup and efficient re-rendering

### Tool Component (`Tool.astro`)
- **Icon Integration**: Dynamic SVG loading via astro-icon
- **Responsive Icons**: Width/height props with CSS overrides
- **External Links**: Direct navigation to technology homepages
- **Hover Effects**: Text underline on hover for better UX

### Layout Hierarchy
```
Layout.astro (base + global styles)
├── index.astro (main page + grid container)
└── ProjectSection/
    ├── index.astro (intersection observer + animations)
    ├── Title.astro (project title display)
    └── Body.astro (content grid)
        ├── Hero.astro (image + live link)
        ├── Tool.astro (technology badges)
        └── GithubButton.astro (repository link)
```

## Animation System

### Scroll-Triggered Animations
- **Intersection Observer**: Each project section starts hidden with blur and translateX offset
- **Animation Classes**: 
  - `.hide` - Initial state (opacity: 0, blur, translateX -90%/90%)
  - `.show` - Triggered state (opacity: 1, no blur, translateX 0)
  - `.left/.right` - Directional slide-in animation based on section index
- **Smooth Transitions**: 0.5s ease-in-out transition for all transforms
- **Scroll Snap**: `scroll-snap-type: y mandatory` with `scroll-snap-align: start` on sections

### Visual Effects
- **Blur to Sharp**: Initial 10px blur dissolves on intersection
- **Slide Animation**: Sections slide from left/right edges (±90%) to center
- **Alternating Pattern**: Even-indexed sections slide from left, odd from right

## Asset Organization

### Icon System
- **Location**: `src/icons/` contains 32 custom SVG icons
- **Integration**: Via `astro-icon` package with dynamic name referencing
- **Usage**: Icons linked to technology objects in `src/data.astro` via `iconName` property
- **Responsive**: Icon sizes scale across breakpoints (16px → 30px → 25px)

### Image Management
- **Hero Images**: Project screenshots stored as `.png/.webp` in `src/images/`
- **Optimization**: Astro's built-in Image component with specified dimensions (1980x1080)
- **Fallback**: `none.webp` used for projects without screenshots
- **Accessibility**: Images wrapped in live project links when available

## Responsive Design Strategy

### Breakpoint System
- **320px**: Mobile-first base (minimum viable layout)
- **640px**: Tablet/large mobile (enhanced spacing, 4-column stack grid)
- **1025px**: Desktop (grid layout switch, 3-column stack)
- **1920px**: Large displays (increased font sizes)

### Layout Transformations
- **Mobile**: Single column, vertical stacking
- **Desktop**: CSS Grid with 6fr/4fr hero/info split
- **Stack Display**: Technology grid adapts from 3→4→3 columns across breakpoints

## Development Notes

- **TypeScript**: Strict mode via `astro/tsconfigs/strict`
- **Font Loading**: Geist Sans via `@fontsource` for consistent typography
- **Icon System**: `astro-icon` with SVG optimization and dynamic imports
- **Image Optimization**: Astro's built-in asset optimization pipeline
- **Global Reset**: Zero margin/padding with border-box sizing
- **Dark Theme**: Black background with white text throughout
- **Scroll Behavior**: Smooth scrolling with viewport-height sections
- **Performance**: Lazy-loaded images and optimized asset delivery via Vercel