import { useContext } from "react";
import useSWR, { useSWRConfig } from "swr";
import APIUrls, { assign } from "../../swr/api";
import { IAgenda } from "./useAgendas";
import { DateContext } from './useDateContext';
import Axios from "../../swr/axios";
import { removeAllDates } from "../../auth/hooks/context";

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
interface ICitas {
    [key: string]: ICita[]
}

const attributes = [
    "idClinica",
    "idAgenda",
    "idCita",
    "idPaciente",
    "Fecha",
    "Hora",
    "Duracion",
    "Concurrio",
    "Confirmada",
    // "InfoExtra",
    // "Nota",
    // "ColorDeFondo",
    // "TipoDeCita",
]

const customFetcher = async (agenda: IAgenda, dates: string[]) => {
    const obj: ICitas = {};
    const responses = await Promise.all(
        dates.map(date => {
            const uri = assign(APIUrls.citas, ['$agenda', '$year', '$month', '$day'], [agenda.idAgenda.toString(), ...date.split('-')]);
            return Axios.get<ICita[]>(uri, { params: { attr: attributes } });
        })
    );
    responses.map((res, index: number) => obj[dates[index]] = res.data);
    return obj;
}

export default function useCitas(agenda: IAgenda) {
    const uri = `citas/week/${agenda.idAgenda}`;
    const { mutate } = useSWRConfig();
    const { date, dates, onRefreshDate } = useContext(DateContext);
    const { data, error } = useSWR<ICitas>(uri, () => customFetcher(agenda, dates))

    const onUpdate = () => {
        removeAllDates();
        onRefreshDate();
        mutate(uri);
    }

    return {
        agenda,
        citas: data ? data[date].sort((a, b) => a.Hora - b.Hora) : [],
        loading: !data,
        error,
        onUpdate
    };
};
