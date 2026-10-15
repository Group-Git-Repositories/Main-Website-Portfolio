# SYSTEM PROMPT: PRODUCTION-READY COMPANY PORTFOLIO & WORKSHOP SHOWROOM

> **Prompt Role & Target Engine**: Feed this specification into an AI Coding Assistant (Claude 3.7 / Gemini 2.5 / Cursor / Antigravity) to generate the complete production codebase for the company portfolio and website showroom.
> **Repository Target**: `https://github.com/Group-Git-Repositories/Main-Website-Portfolio`  
> **Brand Identity**: HOPE Web Development (`Hope_Teams`)  
> **Reference Architecture**: Upgraded from personal developer portfolio baseline (`C:\portfolio`)

---

## 1. MISSION & HIGH-LEVEL OVERVIEW

You are tasked with building a modern, high-performance web agency portfolio and **interactive "Workshop Showroom"** for **HOPE Web Development**. 

The website serves two vital purposes:
1. **Interactive Workshop Showroom**: A high-converting digital exhibition where prospective clients (business owners, startups, corporate clients) can browse real website samples, test them inside responsive device frames (Desktop, Tablet, Mobile), examine deliverables/timelines, and click **"Order a Site Like This"** to immediately initiate an inquiry.
2. **Credentialed Admin Gateway**: Even though the public site behaves as a blazing-fast, SEO-optimized static site, it includes a protected `/admin` control room where the agency team can customize every aspect of the website—from adding new showcase projects and screenshots to modifying hero copy, service packages, pricing tables, theme accents, and inquiry channels—without touching code.

---

## 2. STRICT DESIGN SYSTEM & ANTI-AI CODING RULES (HIGHEST PRIORITY)

> [!CRITICAL]
> **This website MUST NOT look like a generic, template-driven "AI-generated" website.** When inspected by senior web designers or software engineers, it must look like a custom, bespoke digital agency product engineered by hand.

### 2.1 The Zero-Emoji Policy
* **ABSOLUTE BAN ON EMOJIS**: Never use emojis anywhere in the code, user interface, buttons, titles, cards, badges, or JSON data files (no 🚀, 💻, ✨, 🔥, etc.).
* **Functional Icons Only**: Use minimalist, clean SVG icons strictly through `lucide-react`. Icons must only be used where they aid visual hierarchy or navigational clarity, never as decorative fluff.

### 2.2 Eliminating "AI-Generated" Visual Cliches
* **NO Floating Generic Glowing Orbs**: Avoid meaningless, blurry radial gradient blobs placed arbitrarily behind cards.
* **NO Repetitive 3-Column Glassmorphism Cards**: Avoid identical card grids where every card has `backdrop-blur-md bg-white/5 border border-white/10` with identical padding and icons on top.
* **NO Generic AI Marketing Jargon**: Avoid clichés like *"Empowering digital transformation through innovative cutting-edge synergies"*. Instead, use direct, punchy, engineer-grade language (e.g., *"Custom web applications built for conversion, speed, and real operational workflows"*).
* **Bespoke Asymmetric Layouts**: Break the monotony with intentional typographic balance, staggered showcase cards, offset detail panels, and editorial spacing.
* **Tactile, Engineered Borders & Dividers**: Use crisp, subtle, high-contrast border styling (`border-neutral-200/80 dark:border-neutral-800/80`) and fine technical grid accents inspired by high-end design engineering studios (Linear, Vercel, Stripe, Resend).

### 2.3 Typography & Design Aesthetic
* **Primary Fonts**: Clean modern sans-serif for UI (`Plus Jakarta Sans` or `Inter`) paired with a refined monospace font for technical labels, specs, and status indicators (`JetBrains Mono`).
* **Color Palette**: Deep dark foundation (`#070B16` or `#0B0F19`) with sharp, high-legibility light neutral foregrounds, accented by neon-cyan (`#00F2FE`) and vivid violet/indigo (`#7F00FF`) accents taken from the HOPE brand identity.
* **Layout References from `C:\portfolio`**: Maintain the modular separation of concerns, smooth scroll animations, and clean responsive navigation, while upgrading the project presentation to commercial workshop showroom standards.

---

## 3. CORE PUBLIC SHOWROOM FEATURES

### 3.1 Interactive Device Viewport Simulator (The Showroom)
Each showcase item in the workshop showroom must feature a multi-device viewport switcher:
* **Interactive Frame**: Viewers can toggle between **Desktop (16:9 / 1920px)**, **Tablet (4:3 / 768px)**, and **Mobile (9:16 / 375px)** mockups directly on the card or in a full-screen showroom modal.
* **Dual View Mode (Interactive `<iframe>` vs. HD Mockup)**:
  * **Interactive Preview**: When enabled, loads the project's live URL inside the selected device frame (with viewport scaling) so prospective clients can interactively click and scroll through the site right in the showroom. Includes graceful fallback to static mockups if iframe embedding is blocked (`X-Frame-Options`).
  * **HD Mockup Mode**: Renders crisp, high-resolution responsive screenshots within styled device bezels (simulated browser search bar, tablet frame, smartphone notch).
* **Direct External Link**: A high-contrast **"Live Website"** external link button that opens the production site in a new tab with `rel="noopener noreferrer"`.

### 3.2 Industry Categorization
Visitors must be able to filter showroom projects with immediate zero-latency client-side filtering across the following categories:
* **All Projects**
* **e-Commerce** (Online stores, payment flows, inventory displays)
* **Corporate & B2B** (Enterprise landing pages, firm portfolios)
* **Restaurant & Hospitality** (Menus, reservations, location displays)
* **Real Estate & Property** (Property listings, virtual tours, lead forms)
* **SaaS & Web Apps** (Dashboards, customer portals, interactive tools)
* **Creative & Portfolio** (Agencies, personal brands, studios)

### 3.3 Commercial Spec Badges & Customization Options
Every showcase project supports commercial metadata badges that can be **individually enabled, customized, or hidden** via the Admin Gateway:
* **Starting Price**: (e.g., `From $1,200` or `Enterprise Quote`) — Can be toggled on/off per project.
* **Estimated Turnaround**: (e.g., `5–7 Business Days` or `2 Weeks`) — Can be toggled on/off.
* **Deliverable Tags**: (e.g., `Custom CMS`, `Stripe Payments`, `99+ PageSpeed`, `SEO Architecture`, `Mobile-First`).
* **Conversion Action**: A high-visibility button labeled **"Request a Site Like This"** that opens the quote/inquiry modal with this specific project's name and industry pre-selected.

### 3.4 Multi-Channel Lead Capture & Inquiries
The website must provide dual inquiry pathways, both of which can be enabled or disabled via Admin:
1. **Interactive Quote Builder Form**:
   * Collects client name, company/project name, email, phone/WhatsApp, estimated budget tier, target launch date, and selected website style.
   * Submits data to `/api/inquiries` (stores inquiry in JSON/database for admin review and optionally triggers an email notification).
2. **Instant Direct Messaging Channels**:
   * **WhatsApp Direct**: Configurable direct chat link with pre-filled greeting message (`"Hello HOPE team, I am interested in building a website similar to [Project Name]..."`).
   * **Telegram Direct**: Configurable `@username` direct link.
   * **Calendly / Meeting Link**: Optional button to schedule a discovery call directly.

### 3.5 Interactive Website Cost & Scope Estimator
A 3-step interactive estimator widget embedded on the showroom/home page:
1. **Select Website Type**: e-Commerce, Corporate, Restaurant, Real Estate, SaaS, Creative Portfolio.
2. **Select Feature Modules**: Payment Gateway, Table/Event Booking, Multilingual Support, Dynamic Blog/News, Custom Admin CMS, Advanced SEO & Analytics.
3. **Instant Estimate & One-Click Inquiry**: Real-time calculated price range and estimated delivery timeline with a direct **"Commission This Specification"** button that pre-populates the inquiry quote modal with the selected feature breakdown.

---

## 4. CREDENTIALED ADMIN GATEWAY (`/admin`)

The administration gateway allows non-technical team members to customize the website's complete content in real-time.

### 4.1 Authentication & Security
* **Access Path**: `/admin` (with redirect to `/admin/login` when unauthenticated).
* **Credentials**: Username and password verified against server-side environment variables or salted hash stored in configuration.
* **Session Management**: Secure, HTTP-only session cookie (using `iron-session`, JWT, or Next.js encrypted cookies) with automatic session expiry.
* **Brute-Force Protection**: Rate limiting on login attempts.

### 4.2 Content Management Capabilities
The admin dashboard must include tabbed management views:
1. **Showroom Manager (Projects CRUD)**:
   * Add, edit, reorder, and delete showcase projects.
   * Upload desktop, tablet, and mobile screenshot mockups.
   * Toggle visibility of price, timeline, tech stack, and deliverable tags.
   * Mark items as "Featured" on the homepage showroom reel.
2. **Site Content & Copy Editor**:
   * Edit Hero section (headline, sub-headline, value metrics, primary CTA text).
   * Manage Services Catalog (service title, description, key deliverables, starting price).
   * Manage Pricing Packages (Starter, Business, Custom Enterprise packages with feature checklists).
   * Manage Testimonials & Client Logos.
   * Manage FAQs (accordion questions and answers).
3. **Lead & Inquiry Inbox**:
   * View all incoming project requests submitted via the quote builder.
   * Status tags: `New`, `Contacted`, `In Progress`, `Closed`.
   * Export inquiries to CSV or JSON.
4. **Theme & Channel Settings**:
   * Toggle WhatsApp button (enable/disable, set phone number, default message).
   * Toggle Telegram button (enable/disable, set handle).
   * Toggle Quote Form vs. Direct Chat.
   * Select primary theme accent (Cyan/Violet neon, Clean Emerald/Slate, Monochrome Titanium).

---

## 5. TECHNICAL STACK & ARCHITECTURE

* **Framework**: Next.js 14+ (App Router)
* **Styling**: Tailwind CSS with custom typography and color extension plugins
* **Icons**: `lucide-react` (clean, functional SVG icons only)
* **Animation**: Lightweight Framer Motion or pure CSS animations with `IntersectionObserver` (ScrollReveal) to ensure 60fps scrolling and ultra-fast initial load times
* **Data Storage / Persistence**:
  * Dual-layer storage pattern modeled after `C:\portfolio\lib\portfolio.js`:
    1. Primary: Local structured JSON files (`data/company_portfolio.json`, `data/inquiries.json`) for seamless local development and git versioning.
    2. Cloud fallback/sync: Vercel Blob or Supabase storage adapter for serverless deployments on Vercel.
  * Image uploads: File upload route (`/api/upload`) saving to public storage or Vercel Blob store.
* **SEO & Performance**:
  * Server Components for all public marketing copy to guarantee instant First Contentful Paint (FCP) and 100/100 Lighthouse score.
  * OpenGraph meta tags, Twitter card tags, and JSON-LD structured schema for digital agencies (`LocalBusiness` / `ProfessionalService`).

---

## 6. PROJECT DIRECTORY BLUEPRINT

The generated codebase must follow this strict file tree:

```
├── app/
│   ├── (public)/
│   │   ├── layout.js                 # Global public layout, navigation, footer
│   │   ├── page.js                   # Main landing page & showroom
│   │   ├── showroom/
│   │   │   └── page.js               # Dedicated full-catalog workshop showroom
│   │   └── services/
│   │       └── page.js               # In-depth web development services & pricing
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.js               # Secure credentials login
│   │   ├── layout.js                 # Admin navigation sidebar & session wrapper
│   │   ├── page.js                   # Dashboard overview & quick stats
│   │   ├── showroom/
│   │   │   └── page.js               # Project showcase CRUD manager
│   │   ├── content/
│   │   │   └── page.js               # Hero, About, Services, FAQ editor
│   │   ├── inquiries/
│   │   │   └── page.js               # Client quote requests & lead manager
│   │   └── settings/
│   │       └── page.js               # WhatsApp/Telegram toggle, branding settings
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js        # Verify credentials & issue session cookie
│   │   │   └── logout/route.js       # Clear session cookie
│   │   ├── content/
│   │   │   └── route.js              # GET & POST for company portfolio data
│   │   ├── inquiries/
│   │   │   └── route.js              # Submit new quote request & list leads
│   │   └── upload/
│   │       └── route.js              # Multi-mockup image upload handler
│   ├── globals.css                   # Tailwind base, custom scrollbars, clean design tokens
│   └── layout.js                     # Root HTML & font definitions
├── components/
│   ├── admin/
│   │   ├── AdminHeader.js            # Top bar with user profile & logout
│   │   ├── AdminSidebar.js           # Navigation links with active indicator
│   │   ├── ProjectEditorModal.js     # Form to create/edit showroom projects
│   │   └── Toast.js                  # Notification feedback for save actions
│   ├── public/
│   │   ├── Navbar.js                 # Sticky responsive navigation with quote CTA
│   │   ├── Hero.js                   # High-impact editorial hero section
│   │   ├── ShowroomGrid.js           # Filterable workshop showcase grid
│   │   ├── DeviceViewportFrame.js    # Interactive desktop/tablet/mobile mockup frame
│   │   ├── ProjectModal.js           # Deep-dive project modal with full specs
│   │   ├── ServicesList.js           # Agency service packages & deliverables
│   │   ├── PricingMatrix.js          # Clear website packages with feature checklist
│   │   ├── QuoteModal.js             # High-converting step-by-step inquiry modal
│   │   ├── DirectChannelsBar.js      # WhatsApp, Telegram, and Call floating widget
│   │   ├── FAQAccordion.js           # Common client questions & answers
│   │   └── Footer.js                 # Agency footer with links, copyright, social
│   └── ui/
│       ├── Button.js                 # Custom tactile button component
│       ├── Badge.js                  # Clean technical badge component
│       └── ThemeToggle.js            # Dark/light mode switcher
├── data/
│   ├── company_portfolio.json        # Main source of truth for all public content
│   ├── company_portfolio.backup.json # Automated rollback backup
│   └── inquiries.json                # Incoming customer requests and leads
├── lib/
│   ├── auth.js                       # Session verification and password checking
│   ├── data.js                       # Read/write adapter (file system + cloud blob fallback)
│   └── constants.js                  # Industry categories, default theme settings
├── public/
│   ├── projects/                     # Default project showcase screenshots
│   ├── branding/                     # HOPE Web Development logos and SVG badges
│   └── favicon.ico
├── next.config.js                    # Next.js optimization and image remote patterns
├── tailwind.config.js                # Custom color palettes, typography, border radiuses
└── package.json                      # Dependency specifications
```

---

## 7. DATA SCHEMA SPECIFICATION (`data/company_portfolio.json`)

```json
{
  "company": {
    "name": "HOPE Web Development",
    "legalName": "Hope Teams Digital Solutions",
    "tagline": "Precision Engineered Web Architecture & Digital Showroom",
    "location": "Addis Ababa, Ethiopia",
    "email": "contact@hopeteams.com",
    "phone": "+251 973 951 191",
    "github": "https://github.com/Group-Git-Repositories/Main-Website-Portfolio",
    "channels": {
      "whatsapp": {
        "enabled": true,
        "number": "+251973951191",
        "defaultMessage": "Hello HOPE Web Development, I would like to inquire about building a website."
      },
      "telegram": {
        "enabled": true,
        "username": "hope_webdev"
      },
      "quoteForm": {
        "enabled": true
      }
    }
  },
  "hero": {
    "badgeText": "Available for New Projects",
    "headline": "We Build High-Performance Websites That Drive Real Business Growth",
    "subheadline": "Explore our workshop showroom of custom-engineered web platforms. Test them live across devices and commission your custom build today.",
    "primaryCta": "Explore Showroom",
    "secondaryCta": "Request a Quote"
  },
  "projects": [
    {
      "id": "proj-ecommerce-01",
      "title": "Aura Luxury Retail Platform",
      "tagline": "High-conversion headless e-commerce store with automated inventory",
      "category": "e-Commerce",
      "featured": true,
      "mockups": {
        "desktop": "/projects/aura_desktop.webp",
        "tablet": "/projects/aura_tablet.webp",
        "mobile": "/projects/aura_mobile.webp"
      },
      "liveUrl": "https://aura-store-demo.vercel.app",
      "deliverables": [
        "Headless Next.js Storefront",
        "Stripe Payment Gateway",
        "Real-Time Inventory Sync",
        "Sub-Second Page Loads"
      ],
      "specs": {
        "turnaroundDays": 10,
        "showTurnaround": true,
        "startingPrice": "$1,450",
        "showPrice": true,
        "enableOrderCta": true
      },
      "description": "Engineered for a high-end apparel merchant, this platform features an editorial layout, fluid product filtering, and an optimized single-page checkout flow."
    }
  ],
  "services": [
    {
      "id": "srv-custom-web",
      "title": "Custom Business Websites",
      "summary": "Tailored digital experiences built to establish market authority and turn visitors into qualified leads.",
      "startingPrice": "$800",
      "deliveryTime": "5-7 days",
      "features": [
        "Bespoke Responsive Layout",
        "Next.js App Router Architecture",
        "Tailwind CSS Styling",
        "Full Content Admin Gateway"
      ]
    }
  ],
  "pricingPackages": [
    {
      "id": "pkg-starter",
      "name": "Standard Showcase",
      "price": "$650",
      "idealFor": "Small businesses & professional service practices",
      "turnaround": "5 Business Days",
      "features": [
        "Up to 5 Custom Pages",
        "Mobile & Tablet Viewport Optimization",
        "Contact & Lead Capture Form",
        "Basic SEO & Analytics Integration",
        "30 Days Post-Launch Support"
      ]
    }
  ],
  "faq": [
    {
      "question": "Can I edit the text and images on my website myself?",
      "answer": "Yes. Every website we build includes a secure Admin Gateway allowing your team to update text, upload new portfolio samples, change pricing, and manage incoming leads with zero code."
    }
  ]
}
```

---

## 8. IMPLEMENTATION & CODE QUALITY MANDATES

When generating code to fulfill this prompt:
1. **No Placeholders**: Never write comments like `// TODO: implement this later` or `// add other fields here`. Generate fully functioning, executable JavaScript/React components with complete logic.
2. **Error Boundary & Graceful Degradation**: If an image fails to load in the device mockup frame, display an elegant fallback badge with the project title and an external link.
3. **Responsive Testing**: Every component must look impeccable on standard phone screens (360px–420px), tablets (768px–1024px), laptops (1280px–1536px), and ultra-wide displays (1920px+).
4. **Input Sanitization**: Protect admin endpoints and inquiry forms against injection attacks and malformed payloads.
5. **Git-Ready**: Write clean, modular, and self-documenting code structured to be pushed directly to `https://github.com/Group-Git-Repositories/Main-Website-Portfolio`.
