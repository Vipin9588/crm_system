import React , {createContext } from "react";
import {  toast } from 'sonner';
type notifyContextType = {
    toastMessage:(message: string, type: "success" | "error" | "info")=> void;
} 

export  const NotifyContext =  createContext<notifyContextType | null>(null);
    const toastMessage = (message: string, type: "success" | "error" | "info") => {
        switch (type) {
            case "success":
             toast.success(message, {position: "top-center"});
             break;

            case "error":
                toast.error(message,{position: "top-center"});
                break;

            case "info":
                toast(message,{position: "top-center"});
                break;
        }
    }
export default function NotifyContextProvider ({children}:{children:React.ReactNode }){
    return <NotifyContext.Provider value={{
         toastMessage
    }}>
           {
            children
           }
        </NotifyContext.Provider>
}

export const useNotify = () => {
    const context = React.useContext(NotifyContext);
    if (!context) {
        throw new Error("useNotify must be used within a NotifyContextProvider");
    }
    return context;
}


