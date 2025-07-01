import { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      console.log('Network: Online');
      setIsOnline(true);
      
      // Only show "back online" message if we were previously offline
      if (wasOffline) {
        setShowOnlineMessage(true);
        // Hide the online message after 3 seconds
        setTimeout(() => {
          setShowOnlineMessage(false);
          setWasOffline(false);
        }, 3000);
      }
    };

    const handleOffline = () => {
      console.log('Network: Offline');
      setIsOnline(false);
      setWasOffline(true);
      setShowOnlineMessage(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  // Don't show banner if online and no message to show
  if (isOnline && !showOnlineMessage) {
    return null;
  }

  return (
    <>
      {/* Spacer div to push content down */}
      <div style={{ height: '50px' }} />
      
      {/* Fixed banner */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: showOnlineMessage ? 'green' : 'red',
        color: 'white',
        padding: '12px',
        textAlign: 'center',
        zIndex: 1000,
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s ease'
      }}>
        {showOnlineMessage ? (
          <span>
            Back online!
          </span>
        ) : (
          <span>
            You are offline.
          </span>
        )}
      </div>
    </>
  );
}