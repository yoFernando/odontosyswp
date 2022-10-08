import { RefreshControl, ScrollView, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { IAgendaSelectedParamStack } from "../../../navigation/stack";
import styles from "../../../common/styles";
import Appbar from "../container/appbar";
import useCitas from "../../hooks/useCitas";
import AgendaSelector from "./selector";
import CitaList from "./citaList";
import ImageNotFound from '../../../assets/undraw_doctors_hwty.svg';

function AgendaSelectedContainer({ route }: IAgendaSelectedParamStack) {
    const { agenda, citas, date, dates, loading, onUpdate, onChangeDate } = useCitas(route.params);
    return (
        <Appbar title={`${agenda.Nombre} - Citas`}>
            <ScrollView
                contentContainerStyle={styles.grow}
                refreshControl={<RefreshControl refreshing={!!(date && loading)} onRefresh={onUpdate} />}
            >
                {
                    (loading) ? (
                        <View style={[styles.grow, styles.center]}>
                            <ActivityIndicator size="large" />
                        </View>
                    ) : (
                        <View>
                            <View style={styles.paddingVertical20}>
                                <AgendaSelector date={date} dates={dates} onChangeDate={onChangeDate} />
                            </View>
                            <View>
                                {
                                    citas.length ? citas.map(cita => <CitaList key={cita.idCita} agenda={agenda} cita={cita} />)
                                        : (
                                            <View style={[styles.h100, styles.center]}>
                                                <View>
                                                    <ImageNotFound width={300} height={200} />
                                                </View>
                                                <View style={styles.paddingVertical20}>
                                                    <Text style={styles.bold}>No tiene citas para este día</Text>
                                                </View>
                                            </View>
                                        )
                                }
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        </Appbar>
    );
}

export default AgendaSelectedContainer;