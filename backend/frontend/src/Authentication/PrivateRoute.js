import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = () => {
    return localStorage.getItem('token') ? <Outlet /> : <Navigate to="/auth" />
};

const RedirectHome = () => {
    return localStorage.getItem('token') ? <Navigate to="/" /> : <Outlet />
};

export { PrivateRoute, RedirectHome };
