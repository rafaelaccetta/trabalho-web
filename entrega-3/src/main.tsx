import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from "./routes/router"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: true
    }
  }
})
export default queryClient;

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
  </QueryClientProvider>
)
