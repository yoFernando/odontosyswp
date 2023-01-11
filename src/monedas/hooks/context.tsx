import { createContext } from "react";
import { IMoneda } from "../types";
import { IChildren } from './../../common/types';
import useMonedas from './useMonedas';

export const MonedasContext = createContext<IMoneda[] | null>(null);

function MonedasContextContainer(props: IChildren) {
    const monedas = useMonedas();
    return (
        <MonedasContext.Provider value={monedas}>
            {props.children}
        </MonedasContext.Provider>
    );
}

export default MonedasContextContainer;