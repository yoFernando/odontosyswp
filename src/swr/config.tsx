import { useContext } from "react";
import { SWRConfig } from 'swr'
import { IChildren } from "../common/types";
import { SnackbarContext } from "../paper/snackbar/context";

export const SWRConfigContainer = (props: IChildren) => {
    const { onOpenSnack } = useContext(SnackbarContext)
    return (
        <SWRConfig
            value={{
                provider: () => new Map(),
                onError(err) {
                    onOpenSnack(err.message)
                },
            }}
        >
            {props.children}
        </SWRConfig>
    )
};
