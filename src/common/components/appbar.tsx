import { View } from 'react-native';
import { Appbar as MaterialAppbar } from 'react-native-paper';
import { IChildren } from '../types';
import styles from '../styles';

interface IAppbar extends IChildren {
    title: string,
    startIcon?: string,
    endIcon?: string,
    onPressStartIcon: () => void,
    onPressEndIcon: () => void,
    onPressTitle?: () => void
}

const Appbar = (props: IAppbar) => {
    const {
        children,
        title,
        startIcon = "arrow-left",
        endIcon = "account",
        onPressStartIcon,
        onPressEndIcon,
        onPressTitle
    } = props;
    return (
        <View style={styles.grow}>
            <MaterialAppbar.Header mode="center-aligned" style={styles.bgPrimary}>
                <MaterialAppbar.Action icon={startIcon} color="white" onPress={onPressStartIcon} />
                <MaterialAppbar.Content title={title} color="white" onPress={onPressTitle} />
                <MaterialAppbar.Action icon={endIcon} color="white" onPress={onPressEndIcon} />
            </MaterialAppbar.Header>
            <View style={styles.grow}>
                {children}
            </View>
        </View>
    )
};

export default Appbar;