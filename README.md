# 🕹️ D³ FEST 2026 // DREAM. DARE. DEVELOP.

> **East India's Premier Techno-Fest at IIIT Bhubaneswar**  
> *Where vintage 80s arcade aesthetics meet tomorrow's breakthrough technology.*

---

## 🚀 Overview

**D³ Techfest 2026** is the official flagship techno-fest organized by the **Technical Society (TechSoc)** and the **Automation and Robotics Society (ARS)** of **IIIT Bhubaneswar**.

The portal is designed as an interactive retro arcade experience featuring:
- A physical 3D **Arcade Cabinet** with an embedded CRT monitor glass and pinned GSAP scroll zoom transition on the home page.
- A **2-Column Zig-Zag Events Roadmap** connected by a strictly 90-degree orthogonal yellow dot trail with a live animated Pac-Man chomping sprite that illuminates events upon arrival.
- A **Regional Qualifiers Arcade Stage-Select Modal** for the flagship *Craft N Code '26* 24-hour hackathon.
- A synthesized **8-Bit Web Audio Engine** generating authentic retro SFX (`coin`, `blip`, `laser`, `powerup`) dynamically in the browser.
- A single **Centralized Configuration System** (`lib/d3fest.config.ts`) driving all festival events, metadata, Unstop links, and schedules.

---

## ⚡ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with Custom Retro CRT Scanlines & Neon Glows |
| **Animation Engine** | [GSAP](https://gsap.com/) & [ScrollTrigger](https://gsap.com/scrolltrigger/) |
| **Typography** | `Press Start 2P`, `VT323`, `Geist Sans`, `Geist Mono` |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Sound System** | Web Audio API Synthesizer (`AudioContext`) |
| **State & Data** | Centralized TypeScript Configuration Architecture |

---

## 🗺️ Portal Architecture & Route Directory

### 1. Home Page (`/`)
- **Pinned 3D Cabinet Zoom**: Pins the arcade cabinet on scroll and zooms directly into the monitor bezel (`transform-origin: 50% 39%`, capped at `scale: 3.25`).
- **Embedded CRT Screen HUD**: Houses **DREAM DARE DEVELOP** 3D pixel typography, colorful pixel dot trail, Pac-Man `LET'S START` CTA, and bottom stats bar.
- **Crossfade Transition**: At 75%–100% of pinned scroll, smoothly crossfades from the 3D cabinet into a high-resolution, full-screen hero layout without pixel blowout.

### 2. Events Roadmap & Directory (`/events`)
- **2-Column Zig-Zag Layout**: Compact, high-density layout displaying 3 to 4 event cards per viewport on 1080p.
- **Continuous 90-Degree Pac-Man Trail**: Serpentine orthogonal path traversing all 17 levels (`LEVEL 01` to `LEVEL 17`) with animated Pac-Man sprite auto-rotating to face the movement vector on scroll.
- **Dynamic Event Neon Glow**: Cards light up with an intense neon halo and elevation as Pac-Man reaches their milestone.
- **Craft N Code State Qualifier Selector**: Opens a custom arcade character/stage select modal with direct Unstop portals for regional zones (`Odisha (Host)`, `West Bengal`, `Delhi NCR`, `Karnataka`, `Maharashtra`, `Online National Pool`).
- **Consolidated 17-Arena Directory**: Filterable by category pills with real-time keyword search below the roadmap.

### 3. About Us (`/about`)
- **The D³ Manifesto**: Core philosophy from the official brochure.
- **Benchmark 2025 Statistics**:
  - `3,200+` Participants (Highest attendance in IIIT-BH history)
  - `12 Lakh+` Unstop Impressions
  - `4 Lakh+` Website Pageviews
  - `5 Lakh+` Social Media Reach
  - `70+` Colleges across `15+` Indian States
  - `4 Days` Non-Stop Techfest
- **The 3 Cornerstones**: `DREAM` (Rewind the Past), `DARE` (Enter the Arena), `DEVELOP` (Fast-Forward the Future).
- **Organizing Bodies**: Spotlights for **Technical Society** & **Automation and Robotics Society**.

### 4. Merch Shop (`/merch`)
- Retro arcade item shop and drop notification sign-up.

### 5. Sponsors & Partners (`/sponsors`)
- Partner showcases and official sponsorship outreach channels.

### 6. Accommodation & Venue (`/accommodation`)
- On-campus hostel stay guides, venue directions, and food stalls.

### 7. Photo Gallery (`/gallery`)
- Interactive 3D spiral and grid view with dynamic viewport hydration.

### 8. Contact HQ (`/contact`)
- Interactive retro terminal, campus coordinates, and direct messaging portal.

---

## 🛠️ Centralized Config System (`lib/d3fest.config.ts`)

All festival metadata, social links, contact emails, and events are maintained in a single configuration file:

```typescript
export interface EventItem {
  id: string;
  level: string; // e.g. "LEVEL 01"
  title: string;
  subtitle: string;
  category: string;
  description: string;
  date: string; // "TBA"
  time: string; // "TBA"
  venue: string; // "TBA"
  unstopLink?: string; // If empty => Shows "COMING SOON"
  stateRounds?: { state: string; link: string }[];
  whatAwaits: string[];
  bannerBadge?: string;
  rulebookLink?: string;
  teamFormat?: string;
}

export const FEST_CONFIG = {
  name: "D³ FEST '26",
  motto: "DREAM. DARE. DEVELOP.",
  organization: "IIIT Bhubaneswar",
  contactEmails: ["dcube_techfest@iiit-bh.ac.in", "tech-society@iiit-bh.ac.in"],
  events: [ ... ]
};
```

---

## 🔊 Retro Web Audio Engine (`components/retro-audio.tsx`)

The site features zero external audio asset dependencies by synthesizing authentic 8-bit sound waves in real-time via the browser's native `AudioContext`:
- `coin`: Pure dual-frequency square wave ding.
- `powerup`: Ascending frequency sweep.
- `blip`: Quick crisp UI interaction blip.
- `laser`: Downward pitch-decay laser burst.
- `explosion`: Low-frequency noise burst for impact effects.

Includes an interactive Mute/Unmute toggle in the navigation bar with user state persistence.

---

## 💻 Development & Build Setup

### Prerequisites
- Node.js `18.18+` or `20+`
- npm, pnpm, or bun

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Linting & Type Checks
```bash
npm run lint
npx tsc --noEmit
```

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🏛️ Organizing Body

**IIIT Bhubaneswar**  
Gothapatna, Malipada, Bhubaneswar, Odisha 751003  
- **Technical Society (TechSoc)**: Software, Hackathons, Competitive Programming, Web3
- **Automation and Robotics Society (ARS)**: Robotics, Drones, IoT, Hardware Prototyping  
- **Contact**: `dcube_techfest@iiit-bh.ac.in` | `tech-society@iiit-bh.ac.in`

---

## 📜 License
Built for **D³ FEST 2026** by the Technical and Robotics Societies of IIIT Bhubaneswar.
