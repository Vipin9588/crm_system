import Login from "@/Components/Auth/Login";
import Signup from "@/Components/Auth/SignUp";
import Dashboard from "@/features/Dashboard/Dashboard";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./protectedRoute";
import Home from "@/Components/pages/Home";
import path from "path";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute>
            <Home />
        </ProtectedRoute>
        ,
        children: [
            {
                index: true,
                element: <Dashboard />
            }
        ]

    }
    ,
    {
        index: true,
        element: <Signup />,
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },


]);

export default router;

