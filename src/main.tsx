import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { worker } from './mocks/worker'
import { QueryClient, QueryClientProvider } from 'react-query'

if (process.env.NODE_ENV === 'development') {
  worker.start()
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </QueryClientProvider>,
)
