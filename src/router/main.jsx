import Sidebar from "../components/sidebar/sidebar";
import {Outlet} from "react-router-dom";
import "./main.scss";

function Main() {
    return (
        <>
            <Sidebar/>
            <div className="outlet">
            <Outlet/>
            </div>
        </>
    );
}

export default Main;