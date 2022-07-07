import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as routes from "../constants/routes"
import Login from "../components/login/login";
import Reserva from "../components/reserva/reserva";
import Main from "./main";
import AuthRoute from "./AuthRoute";
import {Role} from "../enums/roles";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={routes.LOGIN} element={<Login/>} />
                <Route path={routes.CHILD} element={<Main/>}>
                    <Route path={routes.RESERVE} element={<AuthRoute component= {Reserva} roles={[Role.ADMIN,Role.USER]}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )}

export default Router;