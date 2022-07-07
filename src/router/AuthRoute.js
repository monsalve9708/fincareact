import {Navigate, useLocation} from "react-router-dom";
import jwt_decode from "jwt-decode";
import * as routes from '../constants/routes';
import AccessDenied from "./AccessDenied";
import {Outlet} from "@mui/icons-material";

function AuthRoute({ component: Component, roles }) {
    const location = useLocation();
    const token = window.sessionStorage.getItem("token") ?
        window.sessionStorage.getItem("token") : null;
    const user =token ? jwt_decode(token) : null;
    const userHasRequiredRole = user && roles.includes(user?.type_user);

    if (!user) {
        return <Navigate to={routes.LOGIN} state={{ from: location }} />;
    }

    if (user && !userHasRequiredRole) {
        return <AccessDenied />;
    }

    return user && userHasRequiredRole ? <Component/> : <Outlet/>;
}
export default AuthRoute;