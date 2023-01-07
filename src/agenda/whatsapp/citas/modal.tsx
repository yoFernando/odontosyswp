import React from 'react';
import { List, Divider } from 'react-native-paper';
import Modal from '../../../common/components/modal';
import useAgendas from '../../hooks/useAgendas';
import Agenda from '../container/item';
import { IAgenda } from '../../types';

interface IAgendaModal {
    open: boolean,
    idAgendaSelected?: number,
    onSelectAgenda: (agenda: IAgenda) => void,
    onClose: () => void
}

function AgendaModal({ open, idAgendaSelected, onSelectAgenda, onClose }: IAgendaModal) {
    const { agendas } = useAgendas();
    const onSelect = (agenda: IAgenda) => {
        onClose();
        onSelectAgenda(agenda)
    }
    return (
        <Modal open={open} onClose={onClose}>
            <List.Subheader>Agendas</List.Subheader>
            <Divider />
            {agendas.map(agenda =>
                <Agenda agenda={agenda} active={idAgendaSelected === agenda.idAgenda} key={agenda.idAgenda} onSelect={onSelect} />
            )}
        </Modal>
    );
}

export default AgendaModal;