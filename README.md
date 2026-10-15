# HOPE Web Development | Digital Showroom & Workshop

> **Precision Engineered Web Architecture & Interactive Website Workshop**  
> **Repository**: [Group-Git-Repositories/Main-Website-Portfolio](https://github.com/Group-Git-Repositories/Main-Website-Portfolio)

---

## Overview

This repository contains the official corporate portfolio and **interactive website showroom** for **HOPE Web Development** (`Hope_Teams`).

The platform is designed to turn prospective clients into commissioned projects by showcasing real, production-grade website samples across multi-device viewports (Desktop, Tablet, Mobile) with real-time budget and turnaround estimates.

### Core Features

* **Interactive Workshop Showroom**:
  * Multi-Device Viewport Simulator (toggle between Desktop 1920px, Tablet 768px, and Mobile 375px).
  * Dual View Mode: High-Resolution Mockup viewer and Interactive Live `<iframe>` preview.
  * Direct external link to live deployed websites.
  * Instant category filtering: *e-Commerce, Corporate & B2B, Restaurant & Hospitality, Real Estate, SaaS & Web Apps, Creative Studios*.
  * "Order a Site Like This" direct commission action pre-populating quote forms.
* **Interactive 3-Step Scope & Cost Estimator**:
  * Live calculated budget tier and delivery timeline based on industry and technical modules.
* **Secure Admin Gateway (`/admin`)**:
  * Credential-based login with secure HTTP-only session cookies.
  * Complete CRUD manager for showroom project showcases (media uploads, pricing badges, deliverables tags).
  * Site copy editor for Hero section, Services, Pricing packages, and FAQs.
  * Incoming client inquiries inbox with contact information and referenced project specs.
  * Channel switchboard: Enable or disable WhatsApp direct chat and Telegram links.
* **Bespoke Design & Anti-AI Aesthetics**:
  * Strictly zero emojis anywhere in the codebase or interface.
  * Engineered with `Plus Jakarta Sans`, `JetBrains Mono`, and `lucide-react` icons.
  * Dark and Light theme toggle.

---

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Configure your credentials in `.env.local`:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
SESSION_SECRET=your_32_character_random_secret_key
```

### 3. Running Development Server

```bash
npm run dev
```

Open [http://localhost:3010](http://localhost:3010) to view the workshop showroom.  
Access [http://localhost:3010/admin](http://localhost:3010/admin) to manage content.

---

## Tech Stack

* **Framework**: Next.js 14 (App Router)
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Persistence**: Dual-layer (Local JSON filesystem + Vercel Blob sync)
* **Hosting**: Optimized for Vercel / Node.js
