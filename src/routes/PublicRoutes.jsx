import { lazy } from "react";
import { createBrowserRouter } from "react-router";
const PublicLayout = lazy(() => import('../layouts/Public'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />
    }
]);