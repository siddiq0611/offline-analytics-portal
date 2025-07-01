import useSWR from 'swr';
import Link from 'next/link';
import { BarChart } from '../../components/Charts';
import OfflineBanner from '../../components/OfflineBanner';

export default function Admin() {
  const { data, error, isLoading } = useSWR('/analytics');
  const stats = data || [];

  if (isLoading) return <p>Loading analytics...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const chartData = {
    labels: stats.map(s => s.page),
    datasets: [
      { label: 'Views', data: stats.map(s => s.views), backgroundColor: 'red' },
      { label: 'Clicks', data: stats.map(s => s.clicks), backgroundColor: 'blue' },
    ],
  };

  return (
    <div>
      <OfflineBanner />
      <Link href="/">← Back</Link>
      <h2>Analytics</h2>

      {stats.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <>
          <BarChart data={chartData} title="Page Data" />

          <h3>Details</h3>
          <table border="1" width={300}>
            <thead>
              <tr>
                <th>Page</th>
                <th>Views</th>
                <th>Clicks</th>
                <th>Avg Duration</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s, i) => (
                <tr key={i}>
                  <td>{s.page}</td>
                  <td>{s.views}</td>
                  <td>{s.clicks}</td>
                  <td>{Math.round(s.avgDuration || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}