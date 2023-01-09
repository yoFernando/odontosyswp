import { View, Text } from 'react-native';
import styles from '../styles';

export interface IFound {
    header?: React.ReactNode,
    children: React.ReactNode,
    message: string
}

const NotFound = ({ header, children, message }: IFound) => (
    <View>
        {header}
        <View style={[styles.h100, styles.center]}>
            <View>
                {children}
            </View>
            <View style={styles.paddingVertical20}>
                <Text style={styles.bold}>{message}</Text>
            </View>
        </View>
    </View>
)

export default NotFound