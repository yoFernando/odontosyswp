import { useEffect, useContext, useState } from 'react';
import { Linking, View, TouchableOpacity } from "react-native";
import { Surface, Divider, Text, IconButton } from "react-native-paper";
import styles from "../../../common/styles";
import { ICita } from "../../hooks/useCitas";
import { IAgenda } from "../../hooks/useAgendas";
import useAuth from './../../../auth/hooks/useAuth';
import usePlantillaWhatsapp from "../../hooks/usePlantillas";
import { SnackbarContext } from './../../../paper/snackbar/context';
import { areaCodes, formatHour, getEndHour, getPhone } from "../../../common/helper";
import template from './template';
import { extract } from './../../../swr/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getId = (cita: ICita) => `cita/${cita.idCita}/agenda/${cita.idAgenda}/clinica/${cita.idClinica}`;

function CitaList({ agenda, cita }: { agenda: IAgenda, cita: ICita }) {
    const { onOpenSnack } = useContext(SnackbarContext)
    const plantillas = usePlantillaWhatsapp(1);
    const user = useAuth();

    const [enable, setEnable] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem(getId(cita), function (_error, result) {
            if (result && (JSON.parse(result) === true)) {
                setEnable(false);
            }
        })
    }, [])

    const onPressWhatsapp = () => {
        setEnable(false);
        const phone = getPhone(cita.paciente.movilDeEnvio, areaCodes[user.pais])
        AsyncStorage.setItem(getId(cita), "true", () => {})
        plantillas.get(cita.paciente.idPaciente)
            .then(message => {
                const url = `https://wa.me/${phone}?text=${encodeURI(template(message, cita, agenda))}`;
                Linking.openURL(url)
            })
            .catch(extract(onOpenSnack))
    }

    if (!cita.paciente || cita.paciente.movilDeEnvio.length < 5) {
        return null;
    }

    return (
        <View>
            <Surface elevation={0} style={[styles.paddingVertical10, styles.paddingHorizontal15]}>
                <TouchableOpacity activeOpacity={0.2} style={[styles.row, styles.middle]} onPress={onPressWhatsapp}>
                    <View style={styles.grow}>
                        <View>
                            <View>
                                <Text>{formatHour(cita.Hora)} {' - '} {formatHour(getEndHour(cita))}</Text>
                            </View>
                            <Text style={[styles.grow, styles.shrink, styles.justify, styles.bold]} ellipsizeMode="middle">
                                {cita.paciente.nombre}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <IconButton icon="whatsapp" iconColor={enable ? "green" : 'grey'} size={18} />
                    </View>
                </TouchableOpacity>
            </Surface>
            <Divider style={styles.divider} />
        </View>
    );
}

export default CitaList;