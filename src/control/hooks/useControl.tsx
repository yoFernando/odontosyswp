import useSWR, { useSWRConfig } from "swr";
import APIUrls from './../../swr/api';
import { IControl } from './../types';
import Fetch from './../../swr/fetch';
import { IDate } from "../../common/types";
import { useState } from "react";

// const customFetcher = (url: string) => {
// //?page=1&date=2023-02-07T19:30:44.449Z&until=true&estado=-1
// }

const attributes = [
    "proximoControl.id",
    "pacientes.idPaciente",
    "pacientes.correoDeEnvio as correo",
    "pacientes.movilDeEnvio as telefono",
    "pacientes.nombre",
    "proximoControl.TicksfechahoraEnvioCorreo as emailTick",
    "proximoControl.TicksFechaHoraEnvioSMS as smsTick",
    "proximoControl.TicksFechaHoraEnvioWS as wsTick",
    "proximoControl.Descripcion as nota",
    "proximoControl.FechaDelControl as fecha",
]

const customFetcher = (url: string, { month, year }: IDate, checked: boolean) => {
    return Fetch<IControl[]>(url, {
        params: {
            year: year,
            month: 1 + month,
            attr: attributes,
            reverse: checked
        }
    })
}

export default function useControl(date: IDate) {
    const [checked, setChecked] = useState(false);
    const { mutate } = useSWRConfig();
    const { data, error } = useSWR([APIUrls.control, date, checked], customFetcher)
    const onUpdate = () => mutate(APIUrls.control)

    const onChangeChecked = () => {
        setChecked((oldState) => !oldState);
    }
    return {
        checked,
        data: data,
        loading: !data,
        error,
        onUpdate,
        onChangeChecked,
    };
};