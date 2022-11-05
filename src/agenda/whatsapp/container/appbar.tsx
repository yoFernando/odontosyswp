import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { IChildren } from '../../../common/types';
import styles from '../../../common/styles';

interface IAgendaAppbar extends IChildren {
    title: string,
    onPressBack: () => void,
    onPressProfile: () => void,
    onPressTitle?: () => void
}

const AgendaWhatsappAppbar = (props: IAgendaAppbar) => (
    <View style={styles.grow}>
        <Appbar.Header mode="center-aligned" style={styles.bgPrimary}>
            <Appbar.Action icon="arrow-left" color="white" onPress={props.onPressBack} />
            <Appbar.Content title={props.title} color="white" onPress={props.onPressTitle} />
            <Appbar.Action icon="account" color="white" onPress={props.onPressProfile} />
        </Appbar.Header>
        <View style={styles.grow}>
            {props.children}
        </View>
    </View>
);

export default AgendaWhatsappAppbar;