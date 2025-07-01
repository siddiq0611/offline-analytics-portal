# Offline Analytics Portal

A Next.js application that tracks user interactions across multiple pages with offline-first capabilities.

## Features

- **Offline-First**: Tracks events even when offline and syncs when connection is restored
- **Multi-Page Tracking**: Tracks page views, clicks, and time-on-page across 5 pages
- **Analytics Dashboard**: Admin portal with charts and detailed statistics
- **Real-time Sync**: Automatically syncs queued events when coming back online
- **Offline Indicator**: Shows offline status to users

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Testing Offline Functionality

1. Visit different pages and interact with buttons
2. Open DevTools → Network → Check "Offline" to simulate offline mode
3. Continue navigating and clicking - events will be queued
4. Uncheck "Offline" to come back online - events will sync automatically
5. Visit `/admin` to see analytics

## Project Structure

```
offline-analytics-portal/
├─ pages/                 # Next.js pages & API routes
│  ├─ index.js           # Page 1
│  ├─ page2.js           # Page 2
│  ├─ page3.js           # Page 3
│  ├─ page4.js           # Page 4
│  ├─ page5.js           # Page 5
│  ├─ admin/index.js     # Analytics dashboard
│  └─ api/
│     ├─ events.js       # Event ingestion API
│     └─ analytics.js    # Analytics API
├─ components/           # React components
│  ├─ EventTracker.js    # Event tracking hook
│  ├─ OfflineBanner.js   # Offline status indicator
│  └─ Charts.js          # Chart components
└─ utils/                # Utility modules
   ├─ offlineQueue.js    # IndexedDB queue management
   └─ apiClient.js       # API client
```

## How It Works

1. **Event Tracking**: The `useEventTracker` hook automatically tracks page views and clicks
2. **Offline Queue**: Events are stored in IndexedDB when offline using localforage
3. **Auto Sync**: When connection is restored, queued events are automatically sent to the server
4. **Analytics**: The admin dashboard aggregates and visualizes the collected data

## Technologies# offline-analytics-portal
