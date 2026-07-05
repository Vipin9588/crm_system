import Login from "@/Components/Auth/Login";
import Signup from "@/Components/Auth/SignUp";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./protectedRoute";
import Home from "@/Components/pages/Home";
import ProductPage from "@/features/product/index";
import ProductAddForm from "@/features/product/component/ProductAddForm";
import ProductDetails from "@/features/product/component/productdetails";
import OrderPage from "@/features/Order/index";
import Sale from "@/Components/pages/Sale";
import DemoPage from "@/Components/table/page";
import CustomerPage from "@/features/Customer";
import CustomerForm from "@/features/Customer/components/NewCustomer";
import OrderForm from "@/features/Order/components/OrderForm";
import Dashboard from "@/features/Dashboard";
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
                element: <Dashboard/>
            }, {
                path: "products",
                element: <ProductPage />
            }, {
                path: "addProduct",
                element: <ProductAddForm />
            },
            {
                path: "editProduct/:id",
                element: <ProductAddForm />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
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
                element:<CustomerForm/>
            },{
                path:"edit/customer/:id",
                element:<CustomerForm/>
            },{
                path:"neworder",
                element:<OrderForm/>
            },{
                path:"editOrder/:id",
                element:<OrderForm/>
            },{
                path:"/editProduct/:id",
                element:<ProductAddForm/>
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