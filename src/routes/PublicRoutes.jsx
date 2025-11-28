import { lazy } from "react";
import { createBrowserRouter } from "react-router";
const PublicLayout = lazy(() => import('../layouts/Public'));
const HomePage = lazy(() => import('../pages/public/HomePage'));
const Coverage = lazy(() => import('../pages/public/Coverage'));

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
    }
]);