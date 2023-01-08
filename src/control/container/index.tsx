import { useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View, RefreshControl } from 'react-native';
import styles from '../../common/styles';
import { IControlParamStack } from '../../navigation/stack';
import useControl from '../hooks/useControl';
// import List from './list';
import Appbar from './../../common/components/appbar';
import MonthPicker from 'react-native-month-year-picker';
import { CommonActions } from '@react-navigation/native';
import { URL } from '../../navigation';
import { IControl } from './../types';
import useOpen from './../../common/hooks/useOpen';
import { format, IFormat } from '../../common/helper';
import { Button } from 'react-native-paper';

function ControlContainer({ navigation }: IControlParamStack) {
    const [month, setMonth] = useState(new Date());
    const { data, loading, onUpdate } = useControl(month);
    const picker = useOpen();

    const onValueChange = useCallback(
        (_event: any, newDate?: Date) => {

            picker.onClose();
            setMonth(newDate || month);
        },
        [month, picker],
    )
    const onPressProfile = () => navigation.navigate(URL.profile)
    const onPressBack = () => navigation.dispatch(
        CommonActions.reset({ index: 1, routes: [{ name: URL.modules }] })
    )

    const renderHeader = (
        <View style={styles.paddingVertical15}>
            {/* <MonthPicker month={month} onChangeMonth={setMonth} /> */}
            <Button icon="chevron-down" onPress={picker.onOpen}>
                {format(month, IFormat['DD/MM/YYYY'])}
            </Button>
            {picker.open && (
                <MonthPicker onChange={onValueChange} value={month} okButton="Aceptar" />
            )}
        </View>
    )
    const renderPaciente = ({ item }: { item: IControl }) => <View /> // <List paciente={item} />
    return (
        <Appbar title="Recordatorio de Control" onPressStartIcon={onPressBack} onPressEndIcon={onPressProfile}>
            {
                (loading) ? (
                    <View style={[styles.grow, styles.center]}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <View style={{ flex: 1, flexGrow: 1 }}>
                        {
                            data.length ?
                                <FlatList
                                    data={data}
                                    renderItem={renderPaciente}
                                    keyExtractor={(item) => item.idPaciente.toString()}
                                    ListHeaderComponent={renderHeader}
                                    refreshControl={<RefreshControl refreshing={(data.length && loading)} onRefresh={onUpdate} />}
                                />
                                : (
                                    <ScrollView
                                        refreshControl={<RefreshControl refreshing={(data.length && loading)} onRefresh={onUpdate} />}
                                    >
                                        {/* <CitasNotFound>
                                            {renderHeader}
                                        </CitasNotFound> */}
                                    </ScrollView>
                                )
                        }
                    </View>
                )
            }
        </Appbar>
    );
}

export default ControlContainer;