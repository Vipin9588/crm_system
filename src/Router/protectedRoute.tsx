import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/Authcontext/AuthProvider";
import { Spinner } from "../components/ui/spinner";
import React from "react";


type childrenProps = {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: childrenProps) {
    const { user, loading } = useAuth()
    if (loading) {
        return <div className="h-[100vh] flex justify-center items-center"><Spinner /></div>
    }
    return user !== null ? children : <Navigate to="/login" replace />;
}