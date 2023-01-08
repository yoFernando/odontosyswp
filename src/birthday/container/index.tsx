import { useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View, RefreshControl } from 'react-native';
import styles from '../../common/styles';
import { URL } from '../../navigation';
import { IBirthdayParamStack } from '../../navigation/stack';
import useBirthday from '../hooks/useBirthday';
import { IPaciente } from '../types';
import List from './list';
import Appbar from './../../common/components/appbar';
import MonthPicker from './../../common/components/pickers/month';
import { CommonActions } from '@react-navigation/native';

function BirthdayContainer({ navigation }: IBirthdayParamStack) {
    const [month, setMonth] = useState(new Date().getMonth());
    const { data, loading, onUpdate } = useBirthday(month);

    const onPressProfile = () => navigation.navigate(URL.profile)
    const onPressBack = () => navigation.dispatch(
        CommonActions.reset({ index: 1, routes: [{ name: URL.modules }] })
    )

    const renderHeader = (
        <View style={styles.paddingVertical15}>
            <MonthPicker month={month} onChangeMonth={setMonth} />
        </View>
    )
    const renderPaciente = ({ item }: { item: IPaciente }) => <List paciente={item} />
    return (
        <Appbar title="Saludo de Cumpleaños" onPressStartIcon={onPressBack} onPressEndIcon={onPressProfile}>
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
                                        {renderHeader}
                                        {/* <CitasNotFound>
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

export default BirthdayContainer;