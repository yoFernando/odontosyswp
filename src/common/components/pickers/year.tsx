import { StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import useOpen from "../../../common/hooks/useOpen";
import { Theme } from "../../../paper/config";
import { years } from './../../helper';

interface IYearPicker {
    year: number,
    onChangeYear: (d: number) => void
}

function YearPicker({ year, onChangeYear }: IYearPicker) {
    const menu = useOpen();

    const onSelectYear = (nextYear: number) => () => {
        onChangeYear(nextYear);
        menu.onClose();
    }

    return (
        <Menu
            visible={menu.open}
            onDismiss={menu.onClose}
            anchor={(
                <Button textColor={Theme.colors.primary} icon="chevron-down" contentStyle={styles.content} onPress={menu.onOpen}>
                    {year}
                </Button>
            )}
        >
            {years.map(year => <Menu.Item onPress={onSelectYear(year)} title={year.toString()} key={year.toString()} />)}
        </Menu>
    )
}

const styles = StyleSheet.create({
    content: {
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.primary
    }
})

export default YearPicker;