import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './shared/styles/index.css'
import './shared/styles/tokens.css'
import './shared/i18n/i18n'
import App from './app/App.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours - keeps prefetched data fresh
      gcTime: 24 * 60 * 60 * 1000,    // 24 hours
      refetchOnWindowFocus: false,
      refetchOnMount: false, // Prevent background refetches on component mount
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
