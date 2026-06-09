import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './Context/Authcontext/AuthProvider'
import { RouterProvider } from "react-router-dom";
import router from './Router';
import { Toaster } from 'sonner';
import { TooltipProvider } from "@/Components/ui/tooltip";
import NotifyContextProvider from '@/Context/NotifyContext/NotifyContextProvider';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider >
      <NotifyContextProvider>
         <AuthProvider>
        <Toaster/>
        <RouterProvider router={router} />
      </AuthProvider>
      </NotifyContextProvider>
    </TooltipProvider>
  </StrictMode>,
)
