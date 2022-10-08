import { useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import APIUrls, { assign } from "../../swr/api";
import Fetch from "../../swr/fetch";
import { IAgenda } from "./useAgendas";

export interface IPaciente {
    "idClinica": number,
    "idPaciente": number,
    "idEstadoPersonalizado": number,
    "MedioDeComunicacion": number,
    "nombre": string,
    "movilDeEnvio": string,
    "telefonoParaMostrar": string,
    "tieneAlertaPorCuestionario": boolean
}
export interface ICita {
    "ColorDeFondo": number,
    "Concurrio": number,
    "Confirmada": number,
    "Duracion": number,
    "Hora": number,
    "Fecha": string,
    "InfoExtra": string,
    "Nota": string,
    "TicksFechaUpdated": number,
    "TipoDeCita": number
    "idAgenda": number
    "idCita": number
    "idClinica": number
    "idPaciente": number
    "paciente": null | IPaciente
}
export interface ICitas {
    [key: string]: ICita[]
}

export default function useAgendas(agenda: IAgenda) {
    const uri = assign(APIUrls.citas,['$id'], [agenda.idAgenda])
    const { mutate } = useSWRConfig();
    const { data, error } = useSWR<ICitas>(uri, Fetch<ICitas>)
    const [date, setDate] = useState("")

    const onUpdate = () => mutate(uri)
    const onChangeDate = (newDate: string) => setDate(newDate)

    const citas = useMemo(() => {
        if(!data || !date) return [];
        
        return (data[date] || []).sort((a, b) => a.Hora - b.Hora);
    }, [ date, data ])

    useEffect(() => {
        if(data){
            setDate(oldDate => oldDate || Object.keys(data)[0])
        }
    }, [data])

    return {
        agenda,
        date,
        dates: Object.keys(data || {}),
        citas,
        loading: !data,
        error,
        onUpdate,
        onChangeDate
    };
};
