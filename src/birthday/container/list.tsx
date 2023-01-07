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
import { IPaciente } from '../types';

const getId = (paciente: IPaciente) => `paciente/${paciente.idPaciente}/clinica/${paciente.idClinica}`;

// { "idPlantilla": 0, "label": "Saludo de Cumpleaños" },
// { "idPlantilla": 1, "label": "Recordatorio de Cita" },
// { "idPlantilla": 2, "label": "Recordatorio de Control" },
// { "idPlantilla": 6, "label": "Aviso Paciente Sin Cita" },
// { "idPlantilla": 3, "label": "Aviso de Deuda" }

function PacienteList({ paciente }: { paciente: IPaciente }) {
    const { onOpenSnack } = useContext(SnackbarContext)
    const plantillas = usePlantillaWhatsapp(0);
    const user = useAuth();

    const [enable, setEnable] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem(getId(paciente), function (_error, result) {
            if (result && (JSON.parse(result) === true)) {
                setEnable(false);
            }
        })
    }, [])

    const onPressWhatsapp = () => {
        setEnable(false);
        const phone = getPhone(paciente.movilDeEnvio, areaCodes[user.pais])
        AsyncStorage.setItem(getId(paciente), "true", () => { })
        plantillas.get(paciente.idPaciente)
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
                                <Text>{format(paciente.fechaNacimiento, IFormat["DAY/MONTH"])} {' - '} {getNextBirth(paciente.fechaNacimiento)} años</Text>
                            </View>
                            <Text style={[styles.grow, styles.shrink, styles.justify, styles.bold]} ellipsizeMode="middle">
                                {paciente.nombre}
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

export default PacienteList;