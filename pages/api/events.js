if (typeof global.rawEvents === 'undefined') {
  global.rawEvents = [];
}

export default function handler(req, res) {
  // Add CORS headers for better compatibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-session-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    try {
      let eventData;
      
      // Handle different content types (including sendBeacon blob data)
      if (req.headers['content-type']?.includes('application/json')) {
        eventData = req.body;
      } else {
        // Handle raw body data from sendBeacon
        eventData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      }
      
      const event = {
        ...eventData,
        user: 'anon',
        session: req.headers['x-session-id'] || 'default-session',
        timestamp: new Date().toISOString(),
        serverReceived: Date.now()
      };
      
      global.rawEvents.push(event);
      console.log('Event recorded:', {
        type: event.type,
        page: event.page,
        timestamp: event.timestamp,
        totalEvents: global.rawEvents.length
      });
      
      return res.status(201).json({ 
        ok: true, 
        eventId: event.serverReceived,
        totalEvents: global.rawEvents.length
      });
    } catch (error) {
      console.error('Error processing event:', error);
      return res.status(400).json({ 
        ok: false, 
        error: 'Invalid event data',
        message: error.message 
      });
    }
  }
  
  if (req.method === 'GET') {
    return res.status(200).json({
      events: global.rawEvents,
      count: global.rawEvents.length,
      lastUpdated: new Date().toISOString()
    });
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}