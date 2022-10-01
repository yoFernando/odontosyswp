import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { IChildren } from '../../../common/types';
import styles from '../../../common/styles';

interface IAgendaAppbar extends IChildren {
    title: string
}

const AgendaWhatsappAppbar = (props: IAgendaAppbar) => (
    <View style={styles.grow}>
        <Appbar.Header mode="center-aligned" style={styles.bgPrimary}>
            <Appbar.Content title={props.title} color="white" />
        </Appbar.Header>
        <View style={styles.grow}>
            {props.children}
        </View>
    </View>
);

export default AgendaWhatsappAppbar;