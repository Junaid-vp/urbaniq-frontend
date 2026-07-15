# urbanIQ Frontend App

This is the frontend client application for **urbanIQ**, built using **Next.js (v16.2 App Router)**, **React 19**, and styled with **Tailwind CSS v4**. It features role-based dashboards and interactive workflows for Buyers, Owners, Agents, and Administrators.

---

## 🛠️ Tech Stack & Key Libraries

* **Framework**: Next.js 16 (App Router)
* **Library**: React 19
* **Styling**: Tailwind CSS v4, Lucide React (Icons)
* **Animations**: Framer Motion
* **State Management**: Zustand
* **Maps Integration**: Leaflet & React-Leaflet (for location mapping)
* **Auth**: `@react-oauth/google` for Google Sign-In & custom JWT credentials
* **API Client**: Axios (configured with interceptors to refresh tokens automatically)
* **Notifications**: Sonner (toasts)
* **Real-time Sockets**: `socket.io-client`

---

## 📁 Key Directories & Modules

* **`app/`**: Next.js App Router folders
  * **`(auth)/`**: Pages for Registration, Verification, Login, Forgot Password, and Reset Password.
  * **`(marketing)/`**: Landing pages, search, properties directory, and listing details view.
  * **`dashboard/`**: Role-based interfaces with customized sidebars:
    * **`buyer/`**: Inquiries, submitted offers, visits, and bookmarked listings.
    * **`owner/`**: Analytics on properties, listing creation, visits/offers tracking, and agent assignments.
    * **`agent/`**: Requesting/accepting properties to manage, handling visits/offers, messaging buyers, tracking analytics.
    * **`admin/`**: Overall metrics, user CRUD, approval queues for new listings and agent assignments.
* **`components/`**: Reusable components
  * **`ui/`**: Core design components (buttons, input fields, cards, dialogs, dropdowns, etc.).
  * **`layout/`**: Header, Navbar, Footer, and Role-specific Dashboard Sidebars.
  * **`properties/`**: Leaflet maps integration, search query builders, and filters.
  * **`providers/`**: Google OAuth providers, Socket connection contexts, and global Toast alerts.
* **`store/`**: Zustand client state management
  * **`authStore.ts`**: Manages user authentication status, user details, tokens, and verification status.
  * **`propertyStore.ts`**: Tracks property searches, favorites/bookmarks, and detail overlays.
* **`lib/`**: Helpers
  * **`api.ts`**: Centralized Axios API instance. Configured with credentials and response interceptors to automatically handle token refreshing using `/auth/refresh` on expired sessions.

---

## ⚡ Real-Time Socket Connection

The client establishes a Socket.io connection upon user authentication:
* Listening for live notifications (`new_notification`) and updating user state instantly.
* Real-time chat messaging channels (`new_message`) for messaging between buyers and listing hosts (agents/owners).
* Listening for visit status changes (`visit_updated`) or assignment updates.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root of `urbaniq-frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 🏃 Getting Started

### Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   *The application will boot on [http://localhost:3000](http://localhost:3000).*

### Production Build

Build the optimized bundle and start the Next server:
```bash
npm run build
npm start
```
