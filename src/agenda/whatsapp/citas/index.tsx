import { useRef } from 'react';
import { FlatList, GestureResponderEvent, RefreshControl, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import styles from "../../../common/styles";
import Appbar from "../container/appbar";
import useCitas, { ICita } from "../../hooks/useCitas";
import AgendaSelector from "./selector";
import CitaList from "./citaList";
import ImageNotFound from '../../../assets/undraw_doctors_hwty.svg';
import { URL, IAgendaSelectedParamStack } from "../../../navigation";
import { IChildren } from './../../../common/types';
import AgendaSwitchModal from './../container/switch';
import { IAgenda } from '../../hooks/useAgendas';

function AgendaSelectedContainer({ route, navigation }: IAgendaSelectedParamStack) {
    const bottomSheet = useRef(null)
    const { agenda, citas, loading, onUpdate } = useCitas(route.params);
    const onPressBack = () => navigation.goBack();
    const onPressProfile = () => navigation.navigate(URL.profile)
    const onPressTitle = () => bottomSheet?.current.show()
    const onSelectAgenda = (agenda: IAgenda) => navigation.push(URL.agenda_selected, agenda);

    const renderHeader = (
        <View style={styles.paddingVertical15}>
            <AgendaSelector />
        </View>
    )

    const renderCita = ({ item }: { item: ICita }) => <CitaList agenda={agenda} cita={item} />

    return (
        <Appbar title={`${agenda.Nombre} - Citas`} onPressTitle={onPressTitle} onPressBack={onPressBack} onPressProfile={onPressProfile}>
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
                                    refreshControl={<RefreshControl refreshing={(citas.length && loading)} onRefresh={onUpdate} />}
                                />
                                : (
                                    <CitasNotFound>
                                        {renderHeader}
                                    </CitasNotFound>
                                )
                        }
                    </View>
                )
            }
            <AgendaSwitchModal modalRef={bottomSheet} onSelectAgenda={onSelectAgenda} />
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
                <Text style={styles.bold}>No tiene citas para este día</Text>
            </View>
        </View>
    </View>
)

export default AgendaSelectedContainer;