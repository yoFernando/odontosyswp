import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IChildren } from './../../common/types';
import { assignToken, unassingToken } from './../../swr/axios';
import { Alert, Platform, BackHandler } from "react-native";

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

interface stack {
    cb: () => void;
}
type callback = stack['cb'];

interface IAuthState {
    user?: IUser,
    loading: boolean,
    token: string,
}

interface IAuth extends IAuthState {
    onAuthChange: (auth?: IAuthState) => void,
    onAuthExit: (cb: callback) => void,
}

export const AuthContext = createContext<IAuth>({
    user: undefined,
    loading: true,
    token: '',
    onAuthChange: (_auth?: IAuthState) => { },
    onAuthExit: (cb: callback) => { }
});

function AuthContextContainer(props: IChildren) {
    const [state, setState] = useState<IAuthState>({ user: undefined, loading: true, token: '' })

    useEffect(() => {
        AsyncStorage.getItem(AUTH_SESSION, function (_error?: Error, result?: string) {
            if (result) {
                onAuthChange(JSON.parse(result) as IAuthState)
            } else {
                onAuthChange();
            }
        })
        // eslint-disable-next-line
    }, [])

    const onAuthChange = (auth?: IAuthState) => {
        if (!auth) {
            setState({ user: undefined, token: '', loading: false });
            AsyncStorage.removeItem(AUTH_SESSION, () => { })
            return unassingToken();
        }
        removeAllDates();
        AsyncStorage.setItem(AUTH_SESSION, JSON.stringify(auth), () => {
            assignToken(auth.token)
            setState({ user: auth.user, token: auth.token, loading: false });
        });
    }

    const onAuthExit = (callback: callback) => {
        Alert.alert(
            'Salir',
            '¿Está seguro de que desea salir?',
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Salir",
                    style: "destructive",
                    onPress: () => {
                        if (Platform.OS === "android") {
                            BackHandler.exitApp();
                        } else {
                            callback();
                            onAuthChange();
                        }
                    }
                }
            ]
        )
    }

    return (
        <AuthContext.Provider value={{ ...state, onAuthChange, onAuthExit }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const removeAllDates = () => {
    AsyncStorage.getAllKeys(function (_error, result) {
        if (!_error && result) {
            const keys = result.filter(item => item !== AUTH_SESSION);
            if (keys.length) AsyncStorage.multiRemove(keys);
        }
    })
}

export default AuthContextContainer;