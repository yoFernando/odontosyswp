import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import useOpen from "../../../common/hooks/useOpen";
import { format, IFormat } from "../../../common/helper";
import { Theme } from "../../../paper/config";

interface IAgendaSelector {
    date: string,
    dates: string[],
    onChangeDate: (date: string) => void
}

function AgendaSelector({ date, dates, onChangeDate }: IAgendaSelector) {
    const menu = useOpen();

    const onSelectDate = (date: string) => () => {
        onChangeDate(date);
        menu.onClose();
    }

    const options = useMemo(() => {
        return dates.map(date => <Menu.Item onPress={onSelectDate(date)} title={format(date, IFormat["DAY/MONTH"])} key={date} />)
        // eslint-disable-next-line
    }, [dates])

    return (
        <Menu
            visible={menu.open}
            onDismiss={menu.onClose}
            anchor={(
                <Button textColor={Theme.colors.primary} icon="chevron-down" contentStyle={styles.content} onPress={menu.onOpen}>
                    {format(date, IFormat["DAY/MONTH"])}
                </Button>
            )}
        >
            {options}
        </Menu>
    )
}

const styles = StyleSheet.create({
    content: {
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.primary
    }
})

export default AgendaSelector;