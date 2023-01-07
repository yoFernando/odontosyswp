import useSWR, { useSWRConfig } from "swr";
import APIUrls from "../../swr/api";
import Fetch from "../../swr/fetch";
import { IAgenda } from "../types";

export default function useAgendas() {
    const { mutate } = useSWRConfig();
    const { data, error } = useSWR<IAgenda[]>(APIUrls.agendas, Fetch<IAgenda[]>)
    const onUpdate = () => mutate(APIUrls.agendas)
    return {
        agendas: data && data.filter(item => item.Visible),
        loading: !data,
        error,
        onUpdate
    };
};
