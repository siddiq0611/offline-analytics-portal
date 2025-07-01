import { groupBy, sumBy } from 'lodash';

// Use global to share data between API routes (in production, use a database)
if (typeof global.rawEvents === 'undefined') {
  global.rawEvents = [];
}

export default function handler(req, res) {
  const { page, dateFrom, dateTo } = req.query;
  
  // Get events from global store (in production, this would be a database query)
  let filtered = global.rawEvents || [];
  
  // Filter by page if specified
  if (page) {
    filtered = filtered.filter(e => e.page === page);
  }
  
  // TODO: Implement date filtering
  // if (dateFrom) filtered = filtered.filter(e => new Date(e.timestamp) >= new Date(dateFrom));
  // if (dateTo) filtered = filtered.filter(e => new Date(e.timestamp) <= new Date(dateTo));
  
  // Group events by page
  const byPage = groupBy(filtered, 'page');
  
  // Calculate aggregated metrics
  const result = Object.entries(byPage).map(([p, events]) => {
    const pageViews = events.filter(e => e.type === 'page-view');
    const clicks = events.filter(e => e.type === 'click');
    
    return {
      page: p,
      views: pageViews.length,
      clicks: clicks.length,
      avgDuration: pageViews.length > 0 
        ? sumBy(pageViews, 'duration') / pageViews.length 
        : 0,
    };
  });
  
  res.status(200).json(result);
}