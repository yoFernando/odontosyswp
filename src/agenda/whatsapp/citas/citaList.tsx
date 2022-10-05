import { View } from "react-native";
import { Surface, Divider, Text, IconButton } from "react-native-paper";
import styles from "../../../common/styles";
import { formatHour, getEndHour } from "../../../common/helper";
import { ICita } from "../../hooks/useCitas";

function CitaList({ cita }: { cita: ICita }) {
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
                        <IconButton icon="whatsapp" iconColor="green" size={18} onPress={() => {}} />
                    </View>
                </View>
            </Surface>
            <Divider style={styles.divider} />
        </View>
    );
}

export default CitaList;