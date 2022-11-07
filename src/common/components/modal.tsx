import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';
import { IChildren } from '../types';

export interface IModalContainer extends IChildren {
    open: boolean,
    onClose: () => void
}

function ModalContainer({ open, children, onClose }) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={open}
            onDismiss={onClose}
            onRequestClose={onClose}>
            <TouchableOpacity activeOpacity={1} onPress={onClose} style={style.fade}>
                <Surface style={style.container}>
                    {children}
                </Surface>
            </TouchableOpacity>
        </Modal>
    );
}

const style = StyleSheet.create({
    fade: {
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#efefef',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
    }
})

export default ModalContainer;