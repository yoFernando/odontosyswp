import { useContext } from 'react';
import { Text, View, Image, StyleSheet, Alert } from 'react-native';
import ProfileAppbar from './appbar';
import styles from '../../common/styles';
import { formatAvatar } from '../../common/helper';
import { Button } from 'react-native-paper';
import { Theme } from '../../paper/config';
import { AuthContext } from '../../auth/hooks/context';
import { CommonActions } from '@react-navigation/native';
import { IProfileParamStack } from '../../navigation';

function ProfileContainer({ navigation }: IProfileParamStack) {
  const { user, onAuthChange } = useContext(AuthContext)
  const imageStyle = StyleSheet.flatten({ width: 100, height: 100, borderRadius: 100 })
  const onPressBack = () => navigation.goBack();
  const onPressOut = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Está seguro de que desea cerrar sesión?',
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Salir",
          style: "destructive",
          onPress: () => {
            navigation.dispatch((state) => CommonActions.reset({ ...state, index: 0 }))
            onAuthChange();
          }
        }
      ]
    )
  }
  return (
    <ProfileAppbar title="Perfil" onPressBack={onPressBack}>
      <View style={[styles.grow, styles.between]}>
        <View style={[styles.center, styles.paddingVertical20]}>
          <Image source={{ uri: formatAvatar(user) }} style={imageStyle} />
          <Text style={styles.paddingVertical15}>{user.nombre.split(':')[1] || user.nombre}</Text>
        </View>
        <View style={[styles.paddingHorizontal10, styles.paddingVertical20]}>
          <Button textColor={Theme.colors.danger} onPress={onPressOut}>
            Cerrar Sesión
          </Button>
        </View>
      </View>
    </ProfileAppbar>
  );
}

export default ProfileContainer;