import { StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import useOpen from "../../../common/hooks/useOpen";
import { Theme } from "../../../paper/config";
import { IOption } from "../../types";

interface IRangePicker {
    label: string,
    options: IOption[],
    onChangeRange: (d: number) => void
}

function RangePicker({ label, options, onChangeRange }: IRangePicker) {
    const menu = useOpen();

    const onSelectOption = (nextYear: IOption) => () => {
        onChangeRange(nextYear.value);
        menu.onClose();
    }

    return (
        <Menu
            visible={menu.open}
            onDismiss={menu.onClose}
            anchor={(
                <Button textColor={Theme.colors.primary} icon="chevron-down" contentStyle={styles.content} onPress={menu.onOpen}>
                    {label}
                </Button>
            )}
        >
            {options.map(op => <Menu.Item onPress={onSelectOption(op)} title={op.label} key={op.label} />)}
        </Menu>
    )
}

const styles = StyleSheet.create({
    content: {
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.primary
    }
})

export default RangePicker;