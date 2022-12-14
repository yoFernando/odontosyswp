import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import useOpen from "../../../common/hooks/useOpen";
import { format, IFormat } from "../../../common/helper";
import { Theme } from "../../../paper/config";
import { DateContext } from './../../hooks/useDateContext';

function AgendaSelector() {
    const { date, dates, onChangeDate } = useContext(DateContext);
    const menu = useOpen();

    const onSelectDate = (date: string) => () => {
        onChangeDate(date);
        menu.onClose();
    }
    
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
            {dates.map(date => <Menu.Item onPress={onSelectDate(date)} title={format(date, IFormat["DAY/MONTH"])} key={date} />)}
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