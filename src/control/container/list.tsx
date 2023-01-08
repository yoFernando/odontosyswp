import { useEffect, useContext, useState } from 'react';
import { Linking, View, TouchableOpacity } from "react-native";
import { Surface, Divider, Text, IconButton } from "react-native-paper";
import styles from "../../common/styles";
import useAuth from './../../auth/hooks/useAuth';
import usePlantillaWhatsapp from "../../common/hooks/usePlantillas";
import { SnackbarContext } from '../../paper/snackbar/context';
import { format, getNextBirth, getPhone, areaCodes, IFormat } from "../../common/helper";
import { extract } from './../../swr/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IControl } from './../types';

const getId = (control: IControl) => `control/${control.id}/paciente/${control.idPaciente}`;

function ControlPacienteList({ control }: { control: IControl }) {
    const { onOpenSnack } = useContext(SnackbarContext)
    const plantillas = usePlantillaWhatsapp(2);
    const user = useAuth();

    const [enable, setEnable] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem(getId(control), function (_error, result) {
            if (result && (JSON.parse(result) === true)) {
                setEnable(false);
            }
        })
    }, [])

    const onPressWhatsapp = () => {
        setEnable(false);
        const phone = getPhone(control.telefono, areaCodes[user.pais])
        AsyncStorage.setItem(getId(control), "true", () => { })
        plantillas.get(control.idPaciente)
            .then(message => Linking.openURL(`https://wa.me/${phone}?text=${encodeURI(message)}`))
            .catch(extract(onOpenSnack))
    }
    return (
        <View>
            <Surface elevation={0} style={[styles.paddingVertical10, styles.paddingHorizontal15]}>
                <TouchableOpacity activeOpacity={0.2} style={[styles.row, styles.middle]} onPress={onPressWhatsapp}>
                    <View style={styles.grow}>
                        <View>
                            <View>
                                <Text>{control.nota}</Text>
                            </View>
                            <Text style={[styles.grow, styles.shrink, styles.justify, styles.bold]} ellipsizeMode="middle">
                                {control.nombre}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <IconButton icon="whatsapp" iconColor={enable ? "green" : 'grey'} size={18} onPress={onPressWhatsapp} />
                    </View>
                </TouchableOpacity>
            </Surface>
            <Divider style={styles.divider} />
        </View>
    );
}

export default ControlPacienteList;