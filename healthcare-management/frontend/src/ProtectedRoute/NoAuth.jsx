import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function NoAuthRoute({ children }) {
  const { user } = useAuth();
  
  // Show loader if the user state is undefined (loading)
  if (user === undefined) {
    return <Loader container={true} />;
  }

  // If the user is authenticated (i.e., not null or undefined), redirect to their default route based on their role
  // if (user !== null && user !== undefined) {
  //   return <Navigate to={"/"} replace />;
  // }

  // If user is not authenticated, render the children (protected route content)
  return children;
}
