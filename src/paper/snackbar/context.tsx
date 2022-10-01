import { createContext, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { IChildren } from '../../common/types';

interface ISnackbarContext {
    text: string,
    open: boolean,
    onOpenSnack: (str: string, action?: ISnackAction) => void
}
interface ISnackAction {
    label: string,
    onPress: () => void
}

const SnackDuration = 5000;
export const SnackbarContext = createContext<ISnackbarContext>({ text: '', open: false } as ISnackbarContext);

function SnackBarContext(props: IChildren) {
    const [text, setText] = useState('');
    const [action, setAction] = useState<undefined | ISnackAction>();
    const open = !!text.length;

    const onCloseSnack = () => {
        setText('');
    }
    const onOpenSnack = (str: string, action?: ISnackAction) => {
        setText(str.trim());
        setAction(action)
        console.log('hola')
    }
    return (
        <SnackbarContext.Provider value={{ text, open, onOpenSnack }}>
            {props.children}
            <Snackbar
                duration={SnackDuration}
                visible={open}
                action={action}
                onDismiss={onCloseSnack}
            >
                {text}
            </Snackbar>
        </ SnackbarContext.Provider>
    );
}

export default SnackBarContext