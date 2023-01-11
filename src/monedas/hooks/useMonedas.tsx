import useSWR from 'swr';
import APIUrls from '../../swr/api';
import Fetch from './../../swr/fetch';
import { IMoneda } from './../types';
import useAuth from './../../auth/hooks/useAuth';

export default function useMonedas() {
    const auth = useAuth();
    const { data } = useSWR<IMoneda[]>(auth ? APIUrls.monedas : null, Fetch<IMoneda[]>)
    return data;
}