import { useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View, Image, RefreshControl } from 'react-native';
import styles from '../../common/styles';
import { IControlParamStack } from '../../navigation/stack';
import useControl from '../hooks/useControl';
import List from './list';
import Appbar from './../../common/components/appbar';
import { CommonActions } from '@react-navigation/native';
import { URL } from '../../navigation';
import { IControl } from './../types';
import YearPicker from './../../common/components/pickers/year';
import MonthPicker from './../../common/components/pickers/month';
import { IDate } from '../../common/types';
import { Checkbox, Text } from 'react-native-paper';
import NotFound from '../../common/components/notfound';
import { months } from './../../common/helper';

function ControlContainer({ navigation }: IControlParamStack) {
    const [date, setDate] = useState<IDate>(() => { const d = new Date(); return { month: d.getMonth(), year: d.getFullYear() } })
    const { data, checked, loading, onChangeChecked, onUpdate } = useControl(date);

    const onChangeDate = (key: keyof IDate) => (value: number) => setDate(oldState => ({ ...oldState, [key]: value }))

    const onPressProfile = () => navigation.navigate(URL.profile)
    const onPressBack = () => navigation.dispatch(
        CommonActions.reset({ index: 1, routes: [{ name: URL.modules }] })
    )

    const renderHeader = (
        <View style={styles.paddingVertical15}>
            <View style={[styles.row, styles.grow, styles.center]}>
                <View style={styles.grow}>
                    <MonthPicker month={date.month} onChangeMonth={onChangeDate('month')} />
                </View>
                <View style={styles.grow}>
                    <YearPicker year={date.year} onChangeYear={onChangeDate('year')} />
                </View>
            </View>
            <View style={[styles.row, styles.grow, styles.center, styles.paddingVertical5]}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={onChangeChecked}
                />
                <Text>Ver los controles anteriores</Text>
            </View>
        </View>
    )
    const renderPaciente = ({ item }: { item: IControl }) => <List control={item} />
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
                                        <NotFound
                                            header={renderHeader}
                                            message={`Sin resultados para ${months[date.month]} de ${date.year}`}
                                        >
                                            <Image source={require("../../assets/undraw_spreadsheet.png")} style={{ height: 134, width: 191, marginTop: 50 }} />
                                        </NotFound>
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