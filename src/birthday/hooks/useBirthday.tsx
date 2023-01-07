import useSWR, { useSWRConfig } from "swr";
import APIUrls, { assign } from './../../swr/api';
import { IPaciente } from './../types';
import Fetch from './../../swr/fetch';

const Fetcher = async (uri: string) => {
    const pacientes = await Fetch<IPaciente[]>(uri);
    return pacientes.sort((a, b) => (+a.fechaCumpleaños) - (+b.fechaCumpleaños))
}

export default function useBirthday(month: number) {
    const uri = assign(APIUrls.cumple, [`$month`], [(1+month).toString()]);
    const { mutate } = useSWRConfig();
    const { data, error } = useSWR<IPaciente[]>(uri, Fetcher)
    const onUpdate = () => mutate(uri)
    return {
        data: data,
        loading: !data,
        error,
        onUpdate
    };
};
