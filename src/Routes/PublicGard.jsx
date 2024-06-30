

import { Navigate, Outlet } from "react-router-dom";
const PublicGard = () => {
    let user;
    if(!localStorage.getItem("user")){
        return <Outlet/>
    }
    return !user ? <Navigate to= "/individual"/> : <Outlet/> 
};

export default PublicGard;


