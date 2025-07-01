// pages/_app.js
import '../styles/globals.css';
import { SWRConfig } from 'swr';
import api from '../utils/apiClient';

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{ fetcher: (url) => api.get(url).then(res => res.data) }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}