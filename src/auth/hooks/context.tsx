import { createContext, useState } from "react";
import { IChildren } from './../../common/types';
import { assignToken, unassingToken } from './../../swr/axios';

export interface IUser {
    usuario: string,
    nombre: string,
    pais: string,
    correo: string,
    correoActivo: string,
    'contraseñaWeb': string,
    estado: number,
    usuarios: number,
    idClinica: number,
    idUsuario: number,
    wsHabilitado: number,
    fotoDePerfil: number,
    TipoDeUsuario: number,
    MostrarDoctoresComoGrupo: boolean,
}

interface IAuthState {
    user: undefined | IUser,
    loading: boolean,
    token: string,
}

interface IAuth extends IAuthState {
    onAuthChange: (user: undefined | IUser, token: string) => void
}

export const AuthContext = createContext({} as IAuth);

function getAuthState(){
    return {
        user: undefined,
        loading: true,
        token: ""
    }
}

function AuthContextContainer(props: IChildren) {
    const [state, setState] = useState<IAuthState>(getAuthState)

    const onAuthChange = (user: undefined | IUser, token: string) => {
        if(token){
            assignToken(token)
        } else {
            unassingToken();
        }
        setState({ user, token, loading: false });
    }

    return (
        <AuthContext.Provider value={{ ...state, onAuthChange }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextContainer;