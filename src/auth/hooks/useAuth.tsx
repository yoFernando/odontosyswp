import { useContext } from "react";
import { AuthContext, IUser } from "./context";

function useAuth() {
    const { user } = useContext(AuthContext)
    return user as IUser
}

export default useAuth;