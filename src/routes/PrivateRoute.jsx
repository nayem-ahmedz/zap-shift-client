import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../comps/shared/Loading";

export default function PrivateRoute({children}){
    const { user, loading } = useAuth();
    const location = useLocation();
    // when auth is loading user, prevent redirect to login page by showing loading... comp
    if(loading){
        return <Loading />
    };
    // if no user, redirect to login page, also pass the path from which user is redirected
    if(!user){
        return <Navigate to='/login' state={location.pathname || ''} />
    }
    return children;
}