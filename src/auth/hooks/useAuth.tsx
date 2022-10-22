import { useContext } from "react";
import { AuthContext } from "./context";

function useAuth() {
    const { user } = useContext(AuthContext)
    return user
}

export default useAuth;