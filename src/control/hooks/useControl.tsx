import useSWR, { useSWRConfig } from "swr";
import APIUrls from './../../swr/api';
import { IControl } from './../types';
import Fetch from './../../swr/fetch';

// const customFetcher = (url: string) => {
// //?page=1&date=2023-02-07T19:30:44.449Z&until=true&estado=-1
// }

const attributes = [
    "id",
    "pacientes.idPaciente as idPaciente",
    "pacientes.correoDeEnvio as correo",
    "pacientes.movilDeEnvio as telefono",
    "pacientes.nombre as nombre",
    "TicksfechahoraEnvioCorreo as emailTick",
    "TicksFechaHoraEnvioSMS as smsTick",
    "TicksFechaHoraEnvioWS as wsTick",
    "Descripcion as nota",
    "FechaDelControl as fecha",
]

export default function useControl(month: Date) {
    const { mutate } = useSWRConfig();
    // const { data, error } = useSWR(APIUrls.control, (uri) => Fetch<IPaciente[]>(uri, { params: { month: 1 + month, year } }))
    const { data: response, error } = useSWR<IControl[]>(APIUrls.control, Fetch)
    const onUpdate = () => mutate(APIUrls.control)
    const data: IControl[] = [{id: 1, idPaciente: 5, nombre: "pedro", correo: "", telefono: "", nota: "", fecha: ""}]
    return {
        data: data,
        loading: !data,
        error,
        onUpdate
    };
};