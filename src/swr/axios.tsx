import axios, { AxiosError } from "axios"
import { BASE_URL } from "./api";

interface IAxiosCallback {
    callback: (message: string) => void
}
interface IAxiosErrorResponse {
    data: {
        error: string
    }
}

const AxiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {'x-version': 100}
})

export const assignToken = (token: string) => AxiosClient.defaults.headers.common['x-auth'] = token;
export const unassingToken = () => delete AxiosClient.defaults.headers.common['x-auth'];

export const extract = (callback: IAxiosCallback['callback']) => (e: AxiosError) => {
    const { message, status, response } = e;
    if(parseInt(status) === 403 || response && response.status === 403){
        callback('Es necesario iniciar sesion nuevamente.')
    } else if(!e.response || (e.response && !e.response.data)){
        callback(message);
    } else {
        const response = e.response as IAxiosErrorResponse;
        callback(response.data.error);
    }
}

export default AxiosClient;