import Form from './form'
import { useState } from 'react';
import AxiosClient from '../../swr/axios';
import APIUrls, { extract } from '../../swr/api';
import { useContext } from 'react';
import { SnackbarContext } from './../../paper/snackbar/context';
import { AuthContext, IUser } from './../hooks/context';

interface IAuthState {
  user: IUser,
  token: string
}
export interface ILoginState {
  username: string,
  password: string
}

const defaultState: ILoginState = { username: '', password: '' }
const PasswordRegex = /[^0-9a-zA-ZÀ-ÿá-ü_.\u00f1\u00d1 @]+/g;
const UsernameRegex = /[^A-Za-zá-üÀ-ÿ0-9_.\u00f1\u00d1 @]+/g;

function LoginContainer() {
  const { onOpenSnack } = useContext(SnackbarContext);
  const { loading: authLoading, onAuthChange } = useContext(AuthContext);
  const [state, setState] = useState(defaultState)
  const [error, setError] = useState(defaultState)
  const [loading, setLoading] = useState(false);

  const onChangeState = (name: keyof ILoginState, value: string) => {
    setState(oldState => ({ ...oldState, [name]: value }))
    setError(defaultState);
  }

  const onSubmitState = () => {
    const name = state.username.replace(' :', ':').replace(': ', ':');
    const error: ILoginState = {...defaultState}

    if (name.trim().length < 4) error.username = 'El nombre es muy corto.';
    if (state.password.trim().length < 4) error.password = 'La contraseña es muy corta.';
    if (PasswordRegex.test(state.password)) error.password = 'La contraseña contiene carácteres no permitidos.';
    if (UsernameRegex.test(name.replace(':', ''))) error.username = 'El nombre contiene carácteres no permitidos.';

    if(error.username || error.password){
      return setError(error);
    }

    setLoading(true);
    AxiosClient.post(APIUrls.login, state)
    .then((res) => onAuthChange(res.data))
    .catch(extract(onOpenSnack))
    .finally(() => setLoading(false))
  }
  return (
    <Form
      state={state}
      error={error}
      loading={authLoading || loading}
      onChangeState={onChangeState}
      onSubmitState={onSubmitState}
    />
  );
}

export default LoginContainer;