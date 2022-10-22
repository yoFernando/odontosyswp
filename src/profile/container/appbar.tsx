import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import styles from '../../common/styles';
import { IChildren } from '../../common/types';

interface IProfileAppbar extends IChildren {
    title: string,
    onPressBack: () => void
}

const ProfileAppbar = (props: IProfileAppbar) => (
    <View style={styles.grow}>
        <Appbar.Header mode="center-aligned" style={styles.bgPrimary}>
            <Appbar.Action icon="arrow-left" color="white" onPress={props.onPressBack} />
            <Appbar.Content title={props.title} color="white" />
        </Appbar.Header>
        <View style={styles.grow}>
            {props.children}
        </View>
    </View>
);

export default ProfileAppbar;