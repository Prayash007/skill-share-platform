# SkillSwap Platform

A modern, peer-to-peer skill exchange platform built with React, Vite, TypeScript, Tailwind CSS, and Supabase.

---

## Features

- *User Authentication:* Sign up, log in, and manage sessions securely (Supabase Auth).
- *User Profiles:* Create and edit profiles, add skills offered/wanted, set availability, and upload avatars.
- *Skill Discovery:* Search, filter, and browse users by skills, rating, and availability.
- *Skill Swap Requests:* Send, accept, reject, and manage skill exchange requests.
- *Admin Dashboard:* Platform moderation, user management, ban users, send notifications, and download platform reports.
- *Chatbot Assistant:* In-app AI assistant to help users navigate and answer questions.
- *Responsive UI:* Beautiful, animated, and mobile-friendly interface with Tailwind CSS.
- *Pagination:* Efficiently browse large user lists.
- *Rating System:* Users can rate each other after swaps.
- *Notifications:* Admins can send notifications to all users.
- *Demo Data:* Mock data for users, swap requests, and feedback for testing and development.

---

## Setup Instructions

### 1. Clone the Repository
bash
git clone <your-repo-url>
cd skill-share-platform-main


### 2. Install Dependencies
bash
npm install


### 3. Configure Environment Variables
Create a .env file in the root directory with the following variables:

VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

You can find these in your Supabase project settings.

### 4. Run the Development Server
bash
npm run dev

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 5. Build for Production
bash
npm run build


### 6. Preview Production Build
bash
npm run preview


---

## Project Structure

- src/components/ — All React UI components (Header, Footer, AuthModal, Chatbot, AdminDashboard, etc.)
- src/hooks/ — Custom React hooks for authentication, users, and swap requests.
- src/lib/ — Supabase client setup.
- src/types/ — TypeScript type definitions.
- src/utils/ — Mock data and utility functions.
- supabase/migrations/ — SQL migrations for database setup.

---

## Database

This project uses Supabase for authentication and as a backend database.  
You must set up the following tables in your Supabase project:

- profiles — User profiles, skills, ratings, etc.
- swap_requests — Skill swap requests between users.

You can use the SQL files in supabase/migrations/ to set up your database schema.

---

## Contribution

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Open a pull request.

---

## Authors
1. Prayash Sinha
2. Leora Saharia
3. Abhay Kumar

## License

MIT
