import useSWR, { useSWRConfig } from "swr";
import APIUrls from './../../swr/api';
import Axios from "../../swr/axios";
import { IFilters } from "../types";
import { IDeuda } from './../types';

const URL = "https://odoweb.herokuapp.com/api/v1/reportes/pacientes/deudores";

const customFetcher = async (url: string, { range, moneda }: IFilters) => {
    const { data } = await Axios.get(url, {
        params: {
            diff: range,
            coin: moneda.id_moneda
        }
    })
    return data.list;
}

export default function useDEudores(filters: IFilters) {
    const { mutate } = useSWRConfig();
    const { data, error } = useSWR<IDeuda[]>([URL, filters], customFetcher)
    const onUpdate = () => mutate(APIUrls.control)
    return {
        data: data,
        loading: !data,
        error,
        onUpdate,
    };
};