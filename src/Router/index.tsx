import Login from "@/Components/Auth/Login";
import Signup from "@/Components/Auth/SignUp";
import Dashboard from "@/features/Dashboard/Dashboard";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./protectedRoute";
import Home from "@/Components/pages/Home";
import ProductPage from "@/features/product/index";
import ProductAddForm from "@/features/product/component/ProductAddForm";
import OrderPage from "@/Components/pages/OrderPage";
import Sale from "@/Components/pages/Sale";
import CRMCustomerManagement from "@/Components/pages/Customer";

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
            }, {
                path: "products",
                element: <ProductPage />
            }, {
                path: "addProduct",
                element: <ProductAddForm />
            },
            {
                path: "order",
                element: <OrderPage />
            }, {
                path: "sales",
                element: <Sale />
            },
            {
                path: "customer",
                element: <CRMCustomerManagement />
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

