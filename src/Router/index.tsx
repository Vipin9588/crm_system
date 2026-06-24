import Login from "@/Components/Auth/Login";
import Signup from "@/Components/Auth/SignUp";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./protectedRoute";
import Home from "@/Components/pages/Home";
import ProductPage from "@/features/product/index";
import ProductAddForm from "@/features/product/component/ProductAddForm";
import OrderPage from "@/features/Order/index";
import Sale from "@/Components/pages/Sale";
import DemoPage from "@/Components/table/page";
import CustomerPage from "@/features/Customer";
import AddCustomerForm from "@/features/Customer/components/NewCustomer";
import OrderForm from "@/features/Order/components/OrderForm";

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
                element: <DemoPage />
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
                element: <CustomerPage/>
            },{
                path:"new/customer",
                element:<AddCustomerForm/>
            },{
                path:"neworder",
                element:<OrderForm/>
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

