import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './Authcontext/AuthProvider'
import { RouterProvider } from "react-router-dom";
import router from './Router';
import { Toaster } from 'sonner';
import { TooltipProvider } from "@/Components/ui/tooltip";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <AuthProvider>
        <Toaster toastOptions={{
          style: {
            color: "red",
          },
        }} />
        <RouterProvider router={router} />
      </AuthProvider>
    </TooltipProvider>
  </StrictMode>,
)
