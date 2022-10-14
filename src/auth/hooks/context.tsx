import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IChildren } from './../../common/types';
import { assignToken, unassingToken } from './../../swr/axios';

const AUTH_SESSION = 'AUTH_USER_STORE';

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
    user?: IUser,
    loading: boolean,
    token: string,
}

interface IAuth extends IAuthState {
    onAuthChange: (auth?: IAuthState) => void
}

export const AuthContext = createContext<IAuth>({ user: undefined, loading: true, token: '', onAuthChange: (_auth?: IAuthState) => {} });

function AuthContextContainer(props: IChildren) {
    const [state, setState] = useState<IAuthState>({ user: undefined, loading: true, token: '' })

    useEffect(() => {
        AsyncStorage.getItem(AUTH_SESSION, function(_error?: Error, result?: string){
            if(result){
                onAuthChange(JSON.parse(result) as IAuthState)
            } else {
                onAuthChange();
            }
        })
        // eslint-disable-next-line
    }, [])

    const onAuthChange = (auth?: IAuthState) => {
        if(!auth){
            setState({ user: undefined, token: '', loading: false });
            AsyncStorage.removeItem(AUTH_SESSION, () => { })
            return unassingToken();
        }
        assignToken(auth.token)
        AsyncStorage.setItem(AUTH_SESSION, JSON.stringify(auth), () => {});
        setState({ user: auth.user, token: auth.token, loading: false });
    }

    return (
        <AuthContext.Provider value={{ ...state, onAuthChange }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextContainer;