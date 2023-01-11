import { CommonActions } from "@react-navigation/native";
import { useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper"
import { AuthContext } from "../../auth/hooks/context";
import Appbar from "../../common/components/appbar";
import styles from '../../common/styles';
import { URL } from "../../navigation";
import { IModulesParamStack } from "../../navigation/stack";
import { MonedasContext } from './../../monedas/hooks/context';

function ModulesContainer({ navigation }: IModulesParamStack) {
    const { onAuthExit } = useContext(AuthContext);
    const monedas = useContext(MonedasContext);
    const onPressProfile = () => navigation.navigate(URL.profile)
    const onPressBack = () => onAuthExit(() => navigation.dispatch((state) => CommonActions.reset({ ...state, index: 0 })))
    const onNavigate = (url: URL) => () => navigation.navigate(url);
    return (
        <Appbar title="Módulos" onPressStartIcon={onPressBack} onPressEndIcon={onPressProfile}>
            <View style={[styles.grow, styles.center, styles.paddingHorizontal20]}>
                <View style={[styles.paddingVertical20, styles.paddingHorizontal20, styles.w100]}>
                    <Button mode="contained" icon="calendar-range" uppercase onPress={onNavigate(URL.agenda)}>Recordatorio de Cita</Button>
                </View>
                <View style={[styles.paddingVertical20, styles.paddingHorizontal20, styles.w100]}>
                    <Button mode="contained" icon="cake-variant" uppercase onPress={onNavigate(URL.birthday)}>Saludo de cumpleaÑos</Button>
                </View>
                <View style={[styles.paddingVertical20, styles.paddingHorizontal20, styles.w100]}>
                    <Button mode="contained" icon="clipboard-account-outline" uppercase onPress={onNavigate(URL.control)}>Recordatorio de control</Button>
                </View>
                <View style={[styles.paddingVertical20, styles.paddingHorizontal20, styles.w100]}>
                    <Button mode="contained" icon="wallet" loading={!monedas} disabled={!monedas} uppercase onPress={onNavigate(URL.deuda)}>Aviso de deuda</Button>
                </View>
                <View style={[styles.paddingVertical20, styles.paddingHorizontal20, styles.w100]}>
                    <Button mode="contained" icon="calendar-check" uppercase disabled onPress={onNavigate(URL.agenda)}>Reagendar Cita</Button>
                </View>
            </View>
        </Appbar>
    );
}

export default ModulesContainer;