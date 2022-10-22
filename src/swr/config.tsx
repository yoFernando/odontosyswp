import { useContext } from "react";
import { SWRConfig } from 'swr'
import { AuthContext } from "../auth/hooks/context";
import { IChildren } from "../common/types";
import { SnackbarContext } from "../paper/snackbar/context";
import { extract } from './axios';

export const SWRConfigContainer = (props: IChildren) => {
    const { onOpenSnack } = useContext(SnackbarContext)
    const { onAuthChange } = useContext(AuthContext);
    return (
        <SWRConfig
            value={{
                provider: () => new Map(),
                onError(err) {
                    try {
                        const error = JSON.parse(JSON.stringify(err))
                        if (error.status === 403) {
                            onAuthChange();
                            extract(onOpenSnack)(error)
                            return;
                        }
                    } catch (error) {
                        console.log(error);
                    } finally {
                        onOpenSnack(err.message)
                    }
                },
            }}
        >
            {props.children}
        </SWRConfig>
    )
};
