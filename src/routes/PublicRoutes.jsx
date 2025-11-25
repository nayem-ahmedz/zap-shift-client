import { lazy } from "react";
import { createBrowserRouter } from "react-router";
const PublicLayout = lazy(() => import('../layouts/Public'));
const HomePage = lazy(() => import('../pages/public/HomePage'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            { index: true, element: <HomePage /> }
        ]
    }
]);