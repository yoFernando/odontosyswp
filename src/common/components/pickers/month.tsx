import { StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import useOpen from "../../../common/hooks/useOpen";
import { Theme } from "../../../paper/config";
import { months } from './../../helper';

interface IMonthPicker {
    month: number,
    onChangeMonth: (d: number) => void
}

function MonthPicker({ month, onChangeMonth }: IMonthPicker) {
    const menu = useOpen();

    const onSelectMonth = (nextMonth: number) => () => {
        onChangeMonth(nextMonth);
        menu.onClose();
    }

    return (
        <Menu
            visible={menu.open}
            onDismiss={menu.onClose}
            anchor={(
                <Button textColor={Theme.colors.primary} icon="chevron-down" contentStyle={styles.content} onPress={menu.onOpen}>
                    {months[month]}
                </Button>
            )}
        >
            {months.map((month, index) => <Menu.Item onPress={onSelectMonth(index)} title={months[index]} key={month} />)}
        </Menu>
    )
}

const styles = StyleSheet.create({
    content: {
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.primary
    }
})

export default MonthPicker;