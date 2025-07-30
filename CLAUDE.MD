# SvelteKit Developer Blog - Claude Code Context

## Project Overview
Building a developer blog using SvelteKit with mdsvex for a developer who wants to document their coding journey, comparing different frameworks and sharing technical insights.

## Tech Stack & Architecture
- **Framework**: SvelteKit with TypeScript
- **Content**: mdsvex (Markdown + Svelte components)
- **Styling**: Tailwind CSS with Typography plugin
- **Testing**: Vitest (unit + component testing)
- **Deployment**: Static adapter for home server/GitHub Pages
- **Package Manager**: Yarn

## Developer Preferences & Context
```
Environment: Arch Linux, zsh
Primary Languages: Java, Bash, Lua
Secondary Languages: Python, Ruby, JavaScript, TypeScript
Frameworks: Spring Boot, Ruby on Rails, SvelteKit, React
Workflow: TDD when complex, documentation first, git feature branches
Code Style: Readable over concise, include error handling, clean code
Security: Best practices always, proper input validation
Tools: Neovim, Git, Docker, Docker-compose
```

## Project Structure
```
developer-blog/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   └── blog/
│   │       ├── +page.svelte
│   │       └── [slug]/
│   │           └── +page.ts
│   ├── lib/
│   │   ├── components/
│   │   │   ├── BlogPost.svelte
│   │   │   ├── BlogList.svelte
│   │   │   └── Navigation.svelte
│   │   ├── utils/
│   │   │   └── blog.ts
│   │   └── types.ts
│   └── posts/           # Markdown blog posts
├── static/              # Static assets
├── tests/               # Vitest tests
├── mdsvex.config.js     # Markdown processing config
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Build configuration
├── svelte.config.js     # Svelte configuration
└── package.json
```

## Current Setup Status
✅ SvelteKit project created with minimal template
✅ TypeScript enabled
✅ mdsvex installed and configured
✅ Tailwind CSS with Typography plugin
✅ Vitest for testing
✅ Playwright for E2E testing
✅ ESLint + Prettier for code quality
✅ Static adapter for deployment
✅ Dependencies installed with Yarn

## Implementation Plan

### Phase 1: Blog Foundation
1. **Type Definitions** (`src/lib/types.ts`)
   - BlogPost interface with frontmatter
   - Tag and Category types
   - Error handling types

2. **Blog Utilities** (`src/lib/utils/blog.ts`)
   - Markdown file parsing
   - Frontmatter extraction
   - Post sorting and filtering
   - SEO metadata generation

3. **Core Components**
   - BlogPost.svelte (individual post display)
   - BlogList.svelte (post listing)
   - Navigation.svelte (site navigation)

### Phase 2: Routing & Pages
1. **Dynamic Routes**
   - `/blog` - List all posts
   - `/blog/[slug]` - Individual post pages
   - `/tags/[tag]` - Posts by tag
   - `/` - Homepage with recent posts

2. **Error Handling**
   - 404 pages for missing posts
   - Proper error boundaries
   - Loading states

### Phase 3: Content Management
1. **Markdown Posts Structure**
   ```markdown
   ---
   title: "Post Title"
   date: "2025-01-15"
   tags: ["svelte", "blog", "web-dev"]
   excerpt: "Brief description"
   published: true
   ---
   
   # Post Content
   ```

2. **Interactive Elements**
   - Syntax highlighting
   - Code block enhancements
   - Embedded Svelte components

### Phase 4: Production Features
1. **SEO Optimization**
   - Meta tags
   - Open Graph support
   - Sitemap generation

2. **Performance**
   - Image optimization
   - Code splitting
   - Static generation

3. **Security**
   - Content sanitization
   - CSP headers
   - Input validation

## Testing Strategy
- **Unit Tests**: Blog utilities, markdown parsing
- **Component Tests**: Svelte components
- **E2E Tests**: Full page flows with Playwright
- **TDD Approach**: Write tests first for complex features

## Deployment Options
1. **Home Server**: Docker container with nginx
2. **GitHub Pages**: Automated deployment with Actions
3. **Static Hosting**: Any CDN or static host

## Key Features to Implement
- [ ] Blog post parsing and rendering
- [ ] Dynamic routing for posts
- [ ] Tag-based filtering
- [ ] Search functionality
- [ ] RSS feed generation
- [ ] Dark/light theme toggle
- [ ] Code syntax highlighting
- [ ] Interactive code examples
- [ ] Performance monitoring
- [ ] Analytics integration

## Security Considerations
- Sanitize markdown content
- Validate frontmatter data
- Implement proper CSP headers
- Use environment variables for sensitive config
- Regular dependency updates

## Performance Goals
- Lighthouse score > 95
- First Contentful Paint < 1.5s
- Bundle size optimization
- Image lazy loading
- Static generation for all posts

## Content Strategy
Primary topics for the developer blog:
- Framework comparisons (Rails vs SvelteKit)
- Java/Spring Boot best practices
- DevOps and Docker workflows
- Security implementation guides
- Code review insights
- Tool comparisons and reviews
