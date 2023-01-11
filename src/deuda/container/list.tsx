import { useEffect, useContext, useState } from 'react';
import { Linking, View, TouchableOpacity } from "react-native";
import { Surface, Divider, Text, IconButton } from "react-native-paper";
import styles from "../../common/styles";
import useAuth from './../../auth/hooks/useAuth';
import usePlantillaWhatsapp from "../../common/hooks/usePlantillas";
import { SnackbarContext } from '../../paper/snackbar/context';
import { getPhone, areaCodes, formatCurrency, IFormat } from "../../common/helper";
import { extract } from './../../swr/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IDeuda } from '../types';
import { IMoneda } from '../../monedas/types';
import { format } from './../../common/helper';

const getId = (paciente: IDeuda) => `deuda/paciente/${paciente.idPaciente}`;

function DeudoresList({ paciente, moneda }: { paciente: IDeuda, moneda: IMoneda }) {
    const { onOpenSnack } = useContext(SnackbarContext)
    const plantillas = usePlantillaWhatsapp(2);
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
                            <Text style={[styles.grow, styles.shrink, styles.justify, styles.bold]} ellipsizeMode="middle">
                                {paciente.Nombre}
                            </Text>
                            <View>
                                <Text>Ult. Pago: {format(paciente.Fecha, IFormat['DD/MM/YY'])} - Deuda: {formatCurrency(paciente.Deuda)}{moneda.Simbolo}</Text>
                            </View>
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

export default DeudoresList;