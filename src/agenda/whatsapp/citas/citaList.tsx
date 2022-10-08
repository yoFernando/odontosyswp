import { useContext } from 'react';
import { Linking, View } from "react-native";
import { Surface, Divider, Text, IconButton } from "react-native-paper";
import styles from "../../../common/styles";
import { extract } from "../../../swr/api";
import { ICita } from "../../hooks/useCitas";
import { IAgenda } from "../../hooks/useAgendas";
import useAuth from './../../../auth/hooks/useAuth';
import usePlantillaWhatsapp from "../../hooks/usePlantillas";
import { SnackbarContext } from './../../../paper/snackbar/context';
import { areaCodes, formatHour, getEndHour, getPhone } from "../../../common/helper";
import template from './template';

function CitaList({ agenda, cita }: { agenda: IAgenda, cita: ICita }) {
    const { onOpenSnack } = useContext(SnackbarContext)
    const plantillas = usePlantillaWhatsapp(1);
    const user = useAuth();

    const onPressWhatsapp = () => {
        const phone = getPhone(cita.paciente.movilDeEnvio, areaCodes[user.pais])
        plantillas.get(cita.paciente.idPaciente)
        .then(message => {
            const url = `https://wa.me/${phone}?text=${encodeURI(template(message, cita, agenda))}`;
            Linking.openURL(url)
        })
        .catch(extract(onOpenSnack))
    }
    return (
        <View>
            <Surface elevation={0} style={[styles.paddingVertical10, styles.paddingHorizontal15]}>
                <View style={[styles.row, styles.middle]}>
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
                        <IconButton icon="whatsapp" iconColor="green" size={18} onPress={onPressWhatsapp} />
                    </View>
                </View>
            </Surface>
            <Divider style={styles.divider} />
        </View>
    );
}

export default CitaList;