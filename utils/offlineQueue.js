// utils/offlineQueue.js - Improved version
import localforage from 'localforage';

const queue = localforage.createInstance({ 
  name: 'eventQueue',
  storeName: 'events'
});

export async function enqueue(event) {
  try {
    const list = (await queue.getItem('events')) || [];
    const queuedEvent = { 
      event, 
      ts: Date.now(),
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    list.push(queuedEvent);
    await queue.setItem('events', list);
    
    console.log('Event queued:', queuedEvent);
    return queuedEvent;
  } catch (error) {
    console.error('Error enqueueing event:', error);
    throw error;
  }
}

export async function flush() {
  try {
    const list = (await queue.getItem('events')) || [];
    
    if (list.length > 0) {
      // Clear the queue first to prevent duplicate processing
      await queue.removeItem('events');
      console.log(`Flushing ${list.length} queued events`);
    }
    
    return list;
  } catch (error) {
    console.error('Error flushing queue:', error);
    throw error;
  }
}

export async function getQueueLength() {
  try {
    const list = (await queue.getItem('events')) || [];
    return list.length;
  } catch (error) {
    console.error('Error getting queue length:', error);
    return 0;
  }
}

export async function clearQueue() {
  try {
    await queue.removeItem('events');
    console.log('Queue cleared');
  } catch (error) {
    console.error('Error clearing queue:', error);
    throw error;
  }
}

// Debug function to see what's in the queue
export async function debugQueue() {
  try {
    const list = (await queue.getItem('events')) || [];
    console.log('Queue contents:', list);
    return list;
  } catch (error) {
    console.error('Error debugging queue:', error);
    return [];
  }
}