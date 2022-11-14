import { View, Image, StyleSheet, TextInput, Linking } from "react-native";
import { Button, Text, TextInput as PaperInput } from "react-native-paper";
import styles from "../../common/styles";
import useOpen from './../../common/hooks/useOpen';

import Logo from '../../assets/Icono-Odontosys-Mensajes.png';
import { ILoginState } from ".";
import InputError from "../../common/components/inputerror";
import { useRef } from "react";

interface ILoginForm {
    state: ILoginState,
    error: ILoginState,
    loading: boolean,
    onChangeState: (name: keyof ILoginState, value: string) => void,
    onSubmitState: () => void
}

function LoginContainer({ state, error, loading, onChangeState, onSubmitState }: ILoginForm) {
  const view = useOpen();
  const inputRef = useRef<TextInput>();
  
  const imageStyle = StyleSheet.flatten({ width: 100, height: 100 })
  const containerStyle = StyleSheet.flatten([styles.grow, styles.h100, { justifyContent: 'center', backgroundColor: 'white' }])

  const onSubmitEditing = () => inputRef.current.focus();
  const onChange = (name: keyof ILoginState) => (value: string) => onChangeState(name, value);
  const onPressReset = () => Linking.openURL(`https://app.odontosys.com/forget`);
  return (
    <View style={containerStyle}>

      <View style={styles.center}>
        <View style={styles.paddingVertical20}>
          <Image source={Logo} style={imageStyle} />
        </View>
        <Text variant="titleLarge">Bienvenido</Text>
      </View>

      <View style={[styles.paddingHorizontal15, styles.paddingVertical20]}>
        <View>
          <PaperInput
            label="Nombre de Usuario"
            value={state.username}
            disabled={loading}
            returnKeyType="next"
            onChangeText={onChange('username')}
            onSubmitEditing={onSubmitEditing}
            style={styles.input}
          />
          <InputError error={error.username} />
        </View>
        <View style={styles.paddingVertical15}>
          <PaperInput
            label="Contraseña"
            ref={inputRef}
            value={state.password}
            disabled={loading}
            onChangeText={onChange('password')}
            style={styles.input}
            right={
              <PaperInput.Icon
                icon={view.open ? 'eye-off' : 'eye'}
                onPress={view.onToggle}
                color="#bbbbbb"
              />
            }
            secureTextEntry={view.open ? false : true}
          />
          <InputError error={error.password} />
        </View>
      </View>

      <View>
        <View style={[styles.paddingHorizontal15]}>
          <Button mode="contained" disabled={loading} loading={loading} onPress={onSubmitState}>
            Iniciar Sesión
          </Button>
        </View>
        <View style={styles.paddingVertical10}>
          <Button mode="text" onPress={onPressReset}>
            No recuerdo mi contraseña
          </Button>
        </View>
        <View style={[styles.center, styles.paddingVertical20]}>
          <Text>
            Copyright © Odontosys 2021
          </Text>
        </View>
      </View>

    </View>
  );
}

export default LoginContainer;