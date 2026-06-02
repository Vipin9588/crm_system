import Login from "@/Components/Auth/Login";
import Signup from "@/Components/Auth/SignUp";
import Dashboard from "@/features/Dashboard/Dashboard";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
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
    }
    ,
    {
        path: "/dashboard",
        element: <Dashboard />
    }

]);

export default router;

