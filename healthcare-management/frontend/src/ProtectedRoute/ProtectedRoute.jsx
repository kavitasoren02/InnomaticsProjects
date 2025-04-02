import { Navigate } from "react-router-dom"
import Loader from "../components/Loader"
import { DEFAULT_ROUTE_MAPPING_BY_USER_ROLE } from "../config/config"
import { useAuth } from "./AuthProvider"

const ProtectedRoute = ({ allowedRoles, children }) => {
    const {user} = useAuth()
    console.log({user})
    if(user === undefined){
        return <Loader />
    }

    const redirectRoute = user === null || (allowedRoles && !allowedRoles.includes(user?.role)) ? DEFAULT_ROUTE_MAPPING_BY_USER_ROLE[user?.role] : null;
    console.log({redirectRoute})
    if(redirectRoute){
        return <Navigate to={"/"} replace/>
    }

    return children;
}
export default ProtectedRoute