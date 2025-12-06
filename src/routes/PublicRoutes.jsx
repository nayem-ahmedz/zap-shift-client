import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
const PublicLayout = lazy(() => import('../layouts/Public'));
const HomePage = lazy(() => import('../pages/public/HomePage'));
const Coverage = lazy(() => import('../pages/public/Coverage'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const RiderRegistration = lazy(() => import('../pages/public/RiderRegistration'));
const SendParcel = lazy(() => import('../pages/customer/SendParcel'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: '/coverage',
                loader: () => fetch('/data/warehouses.json').then(res => res.json()),
                element: <Coverage />,
            },
            {
                path: '/rider-registration',
                element: <PrivateRoute> <RiderRegistration /> </PrivateRoute>
            },
            {
                path: '/send-parcel',
                loader: () => fetch('/data/warehouses.json').then(res => res.json()),
                element: <PrivateRoute> <SendParcel /> </PrivateRoute>
            }
        ]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }
]);