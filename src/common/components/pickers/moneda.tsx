import { StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import useOpen from "../../../common/hooks/useOpen";
import { IMoneda } from "../../../monedas/types";
import { Theme } from "../../../paper/config";
import { months } from './../../helper';

interface IMonedaPicker {
    moneda: IMoneda
    monedas: IMoneda[]
    onChangeMoneda: (d: IMoneda) => void
}

function MonedaPicker({ moneda, monedas, onChangeMoneda }: IMonedaPicker) {
    const menu = useOpen();

    const onSelectMoneda = (nextMonth: IMoneda) => () => {
        onChangeMoneda(nextMonth);
        menu.onClose();
    }

    return (
        <Menu
            visible={menu.open}
            onDismiss={menu.onClose}
            anchor={(
                <Button textColor={Theme.colors.primary} icon="chevron-down" contentStyle={styles.content} onPress={menu.onOpen}>
                    {moneda.Simbolo} {moneda.Nombre[0].toUpperCase()}{moneda.Nombre.slice(1)}
                </Button>
            )}
        >
            {monedas.map((moneda) => <Menu.Item onPress={onSelectMoneda(moneda)} title={`${moneda.Simbolo} ${moneda.Nombre[0].toUpperCase()}${moneda.Nombre.slice(1)}`} key={moneda.id} />)}
        </Menu>
    )
}

const styles = StyleSheet.create({
    content: {
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.primary
    }
})

export default MonedaPicker;