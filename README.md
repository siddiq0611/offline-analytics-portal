# 🧠 Offline Analytics Portal

A Next.js-based web app that tracks user activity across five pages, even when offline. Events like page views and clicks are stored locally when the user is offline and synced to the server once the connection is restored. An admin dashboard displays visual analytics using simple charts and tables.

## 📌 Features

- ✅ Offline-first experience
- ✅ Page views and click tracking
- ✅ Local queueing using IndexedDB
- ✅ Auto-sync of events after reconnection
- ✅ Admin dashboard with charts and stats
- ✅ Simple and clean UI

## 🛠️ Technologies Used
- Next.js – frontend framework
- React Hooks – state and lifecycle management
- IndexedDB (via localForage) – for storing offline events
- Axios – for API calls
- SWR – for data fetching in the dashboard
- Custom BarChart (no external chart library) – to keep UI simple and lightweight

## 🗂️ Project Structure

```bash
offline-analytics-portal/
├─ public/                    
├─ pages/                     
│  ├─ _app.js
│  ├─ index.js               # Page 1
│  ├─ page2.js               # Page 2
│  ├─ page3.js               # Page 3
│  ├─ page4.js               # Page 4
│  ├─ page5.js               # Page 5
│  ├─ admin/index.js         # Admin dashboard
│  └─ api/
│     ├─ events.js           # API to collect raw events
│     └─ analytics.js        # API to serve aggregated stats
├─ components/
│  ├─ EventTracker.js        # Custom hook to track user activity
│  ├─ OfflineBanner.js       # UI banner for offline status
│  └─ Charts.js              # Simple bar chart renderer
├─ utils/
│  ├─ offlineQueue.js        # IndexedDB helper for local queueing
│  └─ apiClient.js           # Axios instance for API calls
├─ styles/
│  └─ globals.css            # Global styles
```

## 🔄 Data Flow

1. **User visits any page** → `useEventTracker()` hook starts tracking
2. **Page view / click events** are captured
3. If online → Send to `/api/events`
4. If offline → Store in IndexedDB
5. When connection is restored → Flush and sync all queued events
6. Aggregated data is served at `/api/analytics`

## 📊 Admin Dashboard

- Shows bar chart of views and clicks per page
- Displays detailed stats in a simple table
- Pulls real-time analytics from backend API

## 🧪 Run Locally

```bash
git clone https://github.com/your-username/offline-analytics-portal.git
cd offline-analytics-portal
npm install
npm run dev
```

Visit `http://localhost:3000` and start browsing between pages. Try going offline and interacting, then reconnect to see data sync and reflect in the admin panel.

## ⚠️ Known Limitations

- If the user navigates to a **different page while offline**, the events from the previous page are **not stored**
- This is because the state is reset during full page reloads in offline mode
- Working on a solution using `localStorage` or a persistent service worker

## 📬 Feedback & Contributions

Feel free to fork the repo and improve the offline sync logic. PRs and suggestions are welcome!
