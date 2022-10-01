import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Divider, IconButton, List } from "react-native-paper";
import styles, { intToColor } from "../../../common/styles";
import { IAgenda } from "../../hooks/useAgendas";

function AgendaLeft({ color }: { color: number }) {
    return (
        <View style={styles.center}>
            <View style={StyleSheet.flatten([AgendaStyles.color, { backgroundColor: intToColor(color) }])} />
        </View>
    )
}

function AgendaRight({ visible }: { visible: boolean }) {
    return (
        <View style={styles.center}>
            <IconButton icon={visible ? "eye" : "eye-off"} size={20} />
        </View>
    )
}

function AgendaListItem({ agenda }: { agenda: IAgenda }) {
    return (
        <TouchableOpacity activeOpacity={0.2}>
            <List.Item
                left={() => <AgendaLeft color={agenda.Color} />}
                right={() => <AgendaRight visible={agenda.Visible} />}
                style={styles.paddingVertical10}
                title={agenda.Nombre}
            />
            <Divider style={AgendaStyles.divider} />
        </TouchableOpacity>
    );
}

const AgendaStyles = StyleSheet.create({
    color: { width: 20, height: 20, borderRadius: 20, marginHorizontal: 10 },
    divider: { height: 1 }
})

export default AgendaListItem;