// pages/index.js
import Link from 'next/link';
import { useEventTracker } from '../components/EventTracker';
import OfflineBanner from '../components/OfflineBanner';

export default function Home() {
  useEventTracker('home');

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
        <h1>Page 1</h1>
        <p>Welcome! Interact and go offline; we&apos;ll sync later.</p>
        <button onClick={() => alert('Button clicked!')}>
          Test Click Tracking
        </button>
      </div>
    </div>
  );
}