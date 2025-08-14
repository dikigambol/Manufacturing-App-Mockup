import { Outlet } from "react-router";
import Unauthorized from "../pages/errors/401";
import { Access } from "./access";

const Protected = () => {
    // const token = Access.session();
    const token = true;
    return token ? <Outlet /> : <Unauthorized />
}

export default Protected;