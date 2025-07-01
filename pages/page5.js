// pages/page5.js
import Link from 'next/link';
import { useEventTracker } from '../components/EventTracker';
import OfflineBanner from '../components/OfflineBanner';

export default function Page5() {
  useEventTracker('page5');

  return (
    <div>
      <OfflineBanner />
      <nav style={{ marginBottom: '1rem', padding: '1rem' }}>
        <Link href="/">Page 1</Link> |{' '}
        <Link href="/page2">Page 2</Link> |{' '}
        <Link href="/page3">Page 3</Link> |{' '}
        <Link href="/page4">Page 4</Link> |{' '}
        <Link href="/page5">Page 5</Link> |{' '}
        <Link href="/admin">Admin</Link>
      </nav>
      <div style={{ padding: '1rem' }}>
        <h1>Page 5</h1>
        <p>Final page! Check out the admin panel to see your analytics.</p>
        <button onClick={() => alert('Page 5 button clicked!')}>
          Test Click Tracking
        </button>
      </div>
    </div>
  );
}