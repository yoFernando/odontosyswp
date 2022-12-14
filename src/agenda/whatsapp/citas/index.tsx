import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import styles from "../../../common/styles";
import Appbar from "../container/appbar";
import useCitas, { ICita } from "../../hooks/useCitas";
import AgendaSelector from "./selector";
import CitaList from "./citaList";
import ImageNotFound from '../../../assets/undraw_doctors_hwty.svg';
import { URL, IAgendaSelectedParamStack } from "../../../navigation";
import { IChildren } from './../../../common/types';
import useOpen from './../../../common/hooks/useOpen';
import AgendaModal from "./modal";
import { IAgenda } from "../../hooks/useAgendas";
import { CommonActions } from "@react-navigation/native";

function AgendaSelectedContainer({ route, navigation }: IAgendaSelectedParamStack) {
    const { agenda, citas, loading, onUpdate } = useCitas(route.params);
    const modal = useOpen();

    const onPressBack = () => navigation.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [{ name: URL.agenda }],
        })
    );
    const onPressProfile = () => navigation.navigate(URL.profile)
    const onSelectAgenda = (agenda: IAgenda) => navigation.push(URL.agenda_selected, agenda);

    const renderHeader = (
        <View style={styles.paddingVertical15}>
            <AgendaSelector />
        </View>
    )

    const renderCita = ({ item }: { item: ICita }) => <CitaList agenda={agenda} cita={item} />

    return (
        <Appbar title={agenda.Nombre} icon="home" onPressBack={onPressBack} onPressTitle={modal.onOpen} onPressProfile={onPressProfile}>
            {
                (loading) ? (
                    <View style={[styles.grow, styles.center]}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <View style={{ flex: 1, flexGrow: 1 }}>
                        {
                            citas.length ?
                                <FlatList
                                    data={citas}
                                    renderItem={renderCita}
                                    keyExtractor={(item: ICita) => item.idCita.toString()}
                                    ListHeaderComponent={renderHeader}
                                    refreshControl={<RefreshControl refreshing={!!(citas.length && loading)} onRefresh={onUpdate} />}
                                />
                                : (
                                    <ScrollView
                                        refreshControl={<RefreshControl refreshing={!!(citas.length && loading)} onRefresh={onUpdate} />}
                                    >
                                        <CitasNotFound>
                                            {renderHeader}
                                        </CitasNotFound>
                                    </ScrollView>
                                )
                        }
                    </View>
                )
            }
            <AgendaModal
                idAgendaSelected={agenda.idAgenda}
                open={modal.open}
                onSelectAgenda={onSelectAgenda}
                onClose={modal.onClose}
            />
        </Appbar>
    );
}

const CitasNotFound = (props: IChildren) => (
    <View>
        {props.children}
        <View style={[styles.h100, styles.center]}>
            <View>
                <ImageNotFound width={300} height={200} />
            </View>
            <View style={styles.paddingVertical20}>
                <Text style={styles.bold}>No tiene citas para este d??a</Text>
            </View>
        </View>
    </View>
)

export default AgendaSelectedContainer;