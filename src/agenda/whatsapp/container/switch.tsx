import React from "react";
import { useWindowDimensions } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { List } from "react-native-paper";
import useAgendas from "../../hooks/useAgendas";
import AgendaItem from './listItem';

function AgendaSwitchModal({ modalRef, onSelectAgenda }) {
    const height = useWindowDimensions().height;
    const { agendas } = useAgendas();
    return (
        <BottomSheet
            ref={modalRef}
            height={height / 2}
            draggable
            hasDraggableIcon
        >
            <List.Section>
                {agendas.map(agenda =>
                    <AgendaItem agenda={agenda} key={agenda.idAgenda} onSelect={onSelectAgenda} />
                )}
            </List.Section>
        </BottomSheet>
    );
}

export default AgendaSwitchModal;