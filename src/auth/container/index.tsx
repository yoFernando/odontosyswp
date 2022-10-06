import { View, Image, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import styles from "../../common/styles";
import useOpen from './../../common/hooks/useOpen';

import Logo from '../../assets/logo.png';

function LoginContainer() {
  const view = useOpen();
  const imageStyle = StyleSheet.flatten({ width: 100, height: 100 })
  return (
    <View style={[styles.grow, styles.h100, { justifyContent: 'center' }]}>

      <View style={styles.center}>
        <View style={styles.paddingVertical20}>
          <Image source={Logo} style={imageStyle} />
        </View>
        <Text variant="titleLarge">Bienvenido</Text>
      </View>

      <View style={[styles.paddingHorizontal15, styles.paddingVertical20]}>
        <View>
          <TextInput
            label="Nombre de Usuario"
            // onChangeText={onChange('username')}
            style={styles.input}
          />
          {/* <ViewError error={error.username} /> */}
        </View>
        <View style={styles.paddingVertical15}>
          <TextInput
            label="Contraseña"
            // onChangeText={onChange('password')}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={view.open ? 'eye-off' : 'eye'}
                onPress={view.onToggle}
                color="#bbbbbb"
              />
            }
            secureTextEntry={view.open ? false : true}
          />
          {/* <ViewError error={error.password} /> */}
        </View>
      </View>

      <View>
        <View style={[styles.center, styles.paddingVertical20]}>
          <Button mode="contained">
            Iniciar Sesión
          </Button>
        </View>
        <View style={[styles.center, styles.paddingVertical20]}>
          <Button>
            No recuerdo mi contraseña
          </Button>
        </View>
        <View style={[styles.center, styles.paddingVertical10]}>
          <Text>
            Copyright © Odontosys 2021
          </Text>
        </View>
      </View>

    </View>
  );
}

export default LoginContainer;