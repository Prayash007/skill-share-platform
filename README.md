# Futuristic Skill Swap Platform

> A holographic, neon-lit digital hub for exchanging skills—intuitive, immersive, and production‑ready.

---

## 📋 Problem Statement & Progress

**Problem Statement:** Develop a Skill Swap Platform — a mini application enabling users to list their skills and request others in return. Features include basic info (name, optional location/photo), lists of skills offered/wanted, availability settings (weekends, evenings), public/private profiles, search/browse by skill (e.g., Photoshop, Excel), request/accept/reject swap offers, view current and pending swap requests, delete unaccepted requests, ratings/feedback post-swap, and an Admin role for moderating spam/inappropriate descriptions, banning users, monitoring swap statuses, sending platform-wide messages, and downloading activity/feedback/swap reports.

**Progress:** We have finalized the UI/UX wireframes for Discovery, Profile Detail, Swap Request Modal, Swap Management, Unified Dashboard, Chatbot, and Admin Console. The project structure is set up in React/TypeScript with Tailwind CSS and Framer Motion; we’ve implemented modular components, validation patterns, and coding standards. The frontend is deployed to Vercel for fast previews; backend endpoints will integrate as soon as development completes.

---

## 🚀 Project Overview

**Futuristic Skill Swap Platform** is a next‑generation application designed to make skill exchanges fast, engaging, and secure. Built with a mobile‑first mindset, it features glassmorphic UI, real‑time interactions, and a robust swap management system.

### Key Highlights

* **Holographic UI**: Deep‑space backgrounds, neon accents, glassmorphic panels with smooth animations.
* **Seamless Swap Flow**: From discovery to request to feedback, every step is animated and intuitive.
* **Central Command Hub**: Unified Dashboard for overview, activity feed, swap management, chat, and admin controls.
* **Interactive Chatbot**: “Ask Me” assistant with realistic typing, quick‑question chips, and history.
* **Admin Console**: Flagged content review, user ban, broadcast messaging, real‑time monitoring, and exportable reports.

---

## 📸 Screenshots & Wireframes

1. **Discover Page**: Paginated user gallery with filter chips and glowing skill tags.
2. **Profile Detail**: Large avatar, offered vs. wanted skills, rating & feedback section.
3. **Swap Request Modal**: Step‑by‑step dropdown selectors for your skill vs. theirs and a custom message.
4. **Swap Requests Management**: Filterable list (Pending/Accepted/Rejected) with inline actions.
5. **Unified Dashboard**: Overview cards, recent activity, snapshots, feedback summary, and admin widgets.
6. **Interactive Chatbot**: Floating bubble with full chat overlay.
7. **Admin Command Center**: Flagged content, ban modal, broadcast composer, real‑time stats.

---

## 🛠️ Tech Stack

| Layer            | Technology                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| Frontend         | React, TypeScript, TailwindCSS, Framer Motion                                                           |
| Backend          | Supabase (Authentication, Database, Storage, Realtime)                                                  |
| State & Caching  | Redux Toolkit, React Query, Cookies                                                                     |
| Linting & Format | ESLint, Prettier                                                                                        |
| Deployment       | Vercel ([https://skill-share-platform-zfb9.vercel.app/](https://skill-share-platform-zfb9.vercel.app/)) |


---

## 📦 Installation & Setup

1. **Clone the repo**

   ````bash
   git clone https://github.com/Prayash007/skill-share-platform
   cd skill-share-platform
   ```bash
   git clone https://github.com/Prayash007/skill-share-platform
   cd skill-swap-platform
   ````
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Run locally**

   ```bash
   # Frontend
   cd src && npm run dev

   # Backend (Supabase)
   ```
4. **Build for production**

   ```bash
   cd src && npm run build
   ```

---

## 🎨 UI/UX & Screens

* **Discover Page**: Filter by skill, rating, availability; smooth pagination chips.
* **Profile Detail**: Public profiles only; request button triggers login popup when unauthenticated.
* **Swap Modal**: Dropdowns for offered/wanted skills, message textarea, animated submit.
* **Swap Management**: Status filter dropdown, request list with Accept/Reject/Delete actions, pagination.
* **Dashboard**: Widgets for overview, activity feed, snapshots, feedback, chatbot, and admin controls.
* **Chatbot**: Floating bubble, typing indicator, quick‑question suggestions.
* **Admin Console**: Flag count, ban user modal, broadcast banner, CSV/PDF exports.

---

## ✅ Coding Standards (40%)

* **Data Validation**: Enforce on both frontend & backend (forms, API inputs).
* **Dynamic Values**: No hard‑coded strings or numbers—use environment configs and constants.
* **Reusability**: Modular, DRY components/functions; shared UI library.
* **Performance**: Fast initial load, minimal network calls, caching (React Query, cookies).
* **Error Handling**: Graceful fallbacks, clear user messages for invalid inputs or system errors.
* **Linting**: ESLint & Prettier with strict rules; pre‑commit hooks ensure consistency.
* **Complexity**: Keep logic shallow; leverage hooks & utility functions for algorithms.

---

## 🎯 UI/UX Design Criteria (15%)

* **Responsive & Mobile-First**: Sidebar collapses to bottom nav; single‑column on small screens.
* **Pagination & Breadcrumbs**: Clear navigation for lists and nested pages.
* **Search & Filters**: Visible state, instant feedback, accessible labels.
* **Color Contrast**: font-to-background contrast checks.
* **Touch Targets**: Minimum 44×44 px interactive areas.

---

## 🤝 Contributors

Prayash Sinha (B.Tech Electronics and Communication Engineering @ NIT Raipur) 
Abhay Kumar (B.Tech Computer Science Engineering @ NIT Raipur) 
Leora Saharia (B.Tech Biomedical engineering @ NIT Raipur)

---


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

* Designers & Developers contributing wireframes and feedback
* All open‑source tools and libraries that made this possible

---
