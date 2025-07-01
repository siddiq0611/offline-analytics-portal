import { useEffect, useRef } from 'react';
import { enqueue, flush } from '../utils/offlineQueue';
import api from '../utils/apiClient';

export function useEventTracker(pageName) {
  const enterTime = useRef(Date.now());
  const hasSentPageView = useRef(false);

  // Send page view event when component mounts or comes back online
  const sendPageViewEvent = async () => {
    if (hasSentPageView.current) return;
    
    const duration = Date.now() - enterTime.current;
    const event = { type: 'page-view', page: pageName, duration };
    
    try {
      if (navigator.onLine) {
        await api.post('/events', event);
        hasSentPageView.current = true;
        console.log('Page view sent online:', event);
      } else {
        await enqueue(event);
        console.log('Page view queued offline:', event);
      }
    } catch (error) {
      console.error('Error sending page view:', error);
      await enqueue(event);
    }
  };

  // Sync queued events when coming back online
  const syncQueuedEvents = async () => {
    try {
      const queued = await flush();
      console.log('Syncing queued events:', queued.length);
      
      if (queued.length > 0) {
        for (const { event } of queued) {
          try {
            await api.post('/events', event);
            console.log('Synced event:', event);
          } catch (error) {
            console.error('Failed to sync event:', event, error);
            // Re-queue failed events
            await enqueue(event);
          }
        }
        
        // Trigger a page reload or state update to refresh analytics
        if (window.location.pathname === '/admin') {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Error syncing queued events:', error);
    }
  };

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = async (e) => {
      // Send final page view with updated duration
      const duration = Date.now() - enterTime.current;
      const event = { type: 'page-view', page: pageName, duration };
      
      try {
        if (navigator.onLine) {
          // Use sendBeacon for more reliable delivery during page unload
          const blob = new Blob([JSON.stringify(event)], { type: 'application/json' });
          navigator.sendBeacon('/api/events', blob);
        } else {
          await enqueue(event);
        }
      } catch (error) {
        console.error('Error in beforeunload:', error);
        await enqueue(event);
      }
    };

    const handleOnline = async () => {
      console.log('Connection restored - syncing data...');
      await syncQueuedEvents();
      
      // Send current page view if not sent yet
      if (!hasSentPageView.current) {
        await sendPageViewEvent();
      }
    };

    const handleOffline = () => {
      console.log('Connection lost - queuing events...');
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Send initial page view
    sendPageViewEvent();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pageName]);

  // Click tracking
  useEffect(() => {
    const handleClick = async (e) => {
      // Skip clicks on navigation links to avoid duplicate tracking
      if (e.target.tagName === 'A') return;
      
      const event = { 
        type: 'click', 
        page: pageName, 
        x: e.clientX, 
        y: e.clientY,
        target: e.target.tagName,
        timestamp: Date.now()
      };
      
      try {
        if (navigator.onLine) {
          await api.post('/events', event);
          console.log('Click sent online:', event);
        } else {
          await enqueue(event);
          console.log('Click queued offline:', event);
        }
      } catch (error) {
        console.error('Error sending click event:', error);
        await enqueue(event);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pageName]);

  // Periodic sync attempt (every 30 seconds when online)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (navigator.onLine) {
        await syncQueuedEvents();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);
}