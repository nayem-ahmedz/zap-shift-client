import { lazy } from "react";
import { createBrowserRouter } from "react-router";
const PublicLayout = lazy(() => import('../layouts/Public'));
const HomePage = lazy(() => import('../pages/public/HomePage'));
const Coverage = lazy(() => import('../pages/public/Coverage'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));

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