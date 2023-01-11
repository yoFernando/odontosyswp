import { useState, useContext } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View, Image, RefreshControl } from 'react-native';
import styles from '../../common/styles';
import { IDeudaParamStack } from '../../navigation/stack';
import List from './list';
import Appbar from './../../common/components/appbar';
import { CommonActions } from '@react-navigation/native';
import { URL } from '../../navigation';
import { IDeuda, IFilters } from '../types';
import { IOption } from '../../common/types';
import useDeudores from '../hooks/useDeudores';
import MonedaPicker from './../../common/components/pickers/moneda';
import RangePicker from '../../common/components/pickers/range';
import NotFound from '../../common/components/notfound';
import { MonedasContext } from './../../monedas/hooks/context';

const options: IOption[] = [
    { value: 5, label: "5 dias" },
    { value: 7, label: "7 dias" },
    { value: 10, label: "10 dias" },
    { value: 15, label: "15 dias" },
    { value: 21, label: "21 dias" },
    { value: 30, label: "30 dias" },
    { value: 60, label: "60 dias" },
    { value: 90, label: "90 dias" },
    { value: 120, label: "120 dias" },
    { value: 365, label: "365 dias" }
]

function Deudores({ navigation }: IDeudaParamStack) {
    const monedas = useContext(MonedasContext);
    const [filters, setFilters] = useState<IFilters>({ range: 30, moneda: monedas[0] })
    const { data, loading, onUpdate } = useDeudores(filters);

    const onChangeMoneda = (moneda: IFilters['moneda']) => setFilters(oldState => ({ ...oldState, moneda }))
    const onChangeRange = (range: IFilters['range']) => setFilters(oldState => ({ ...oldState, range }))

    const onPressProfile = () => navigation.navigate(URL.profile)
    const onPressBack = () => navigation.dispatch(
        CommonActions.reset({ index: 1, routes: [{ name: URL.modules }] })
    )

    const renderHeader = (
        <View style={styles.paddingVertical15}>
            <View style={[styles.row, styles.grow, styles.center]}>
                <View style={styles.grow}>
                    <MonedaPicker moneda={filters.moneda} monedas={monedas} onChangeMoneda={onChangeMoneda} />
                </View>
                <View style={styles.grow}>
                    <RangePicker label={`Ult. Pago: ${filters.range} dias`} options={options} onChangeRange={onChangeRange} />
                </View>
            </View>
        </View>
    )
    const renderPaciente = ({ item }: { item: IDeuda }) => <List paciente={item} moneda={filters.moneda} />
    return (
        <Appbar title="Recordatorio de Deuda" onPressStartIcon={onPressBack} onPressEndIcon={onPressProfile}>
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
                                            message={`Sin resultados en los ultimos ${filters.range} dias`}
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

export default Deudores;