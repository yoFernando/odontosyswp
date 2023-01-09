import { FlatList, RefreshControl, ScrollView, View, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import styles from "../../../common/styles";
import Appbar from "../container/appbar";
import useCitas from "../../hooks/useCitas";
import Selector from "./selector";
import List from "./list";
import { URL, IAgendaSelectedParamStack } from "../../../navigation";
import useOpen from './../../../common/hooks/useOpen';
import AgendaModal from "./modal";
import { IAgenda, ICita } from './../../types';
import NotFound from "../../../common/components/notfound";

function AgendaSelectedContainer({ route, navigation }: IAgendaSelectedParamStack) {
    const { agenda, citas, loading, onUpdate } = useCitas(route.params);
    const modal = useOpen();

    const onPressBack = () => navigation.dispatch(
        CommonActions.reset({ index: 1, routes: [{ name: URL.agenda }] })
    );
    const onPressProfile = () => navigation.navigate(URL.profile)
    const onSelectAgenda = (agenda: IAgenda) => navigation.push(URL.agenda_selected, agenda);

    const renderHeader = (
        <View style={styles.paddingVertical15}>
            <Selector />
        </View>
    )

    const renderCita = ({ item }: { item: ICita }) => <List agenda={agenda} cita={item} />

    return (
        <Appbar title={agenda.Nombre} onPressBack={onPressBack} onPressTitle={modal.onOpen} onPressProfile={onPressProfile}>
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
                                        <NotFound
                                            header={renderHeader}
                                            message="No tiene citas para este día"
                                        >
                                            <Image source={require("../../../assets/undraw_medicine.png")} style={{ height: 195.75, width: 275, marginTop: 50 }} />
                                        </NotFound>
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

export default AgendaSelectedContainer;