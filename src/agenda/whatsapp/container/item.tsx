import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Divider, List } from "react-native-paper";
import styles, { intToColor } from "../../../common/styles";
import { IAgenda } from "../../hooks/useAgendas";

interface IAgendaItem {
    agenda: IAgenda,
    active?: boolean,
    onSelect: (arg: IAgenda) => void
}

function AgendaItem({ agenda, active, onSelect }: IAgendaItem) {
    const onPressAgenda = () => onSelect(agenda)
    return (
        <TouchableOpacity activeOpacity={0.2} onPress={onPressAgenda}>
            <List.Item
                style={styles.paddingVertical10}
                title={agenda.Nombre}
                left={() => (
                    <View style={styles.center}>
                        <View style={StyleSheet.flatten([AgendaStyles.color, { backgroundColor: intToColor(agenda.Color) }])} />
                    </View>
                )}
                right={active ? (props) => <List.Icon {...props} color="green" icon="check" /> : undefined}
            />
            <Divider style={styles.divider} />
        </TouchableOpacity>
    );
}

const AgendaStyles = StyleSheet.create({
    color: { width: 20, height: 20, borderRadius: 20, marginHorizontal: 10 },
})

export default AgendaItem;