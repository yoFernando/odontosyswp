import { AxiosError } from 'axios';
export const BASE_URL = 'https://odomagenes.herokuapp.com/api/v1/'
// export const BASE_URL = 'http://192.168.1.2:5000/api/v1'

enum APIUrls {
    login = `auth/login`,
    agendas = `agendas`,
    citas = `citas/$id/week`
}

export function assign(uri: string, params: string[], values: string | number[]) {
    let str = uri;
    for (let i = 0; i < params.length; i++) {
        str = str.replace(params[i], values[i].toString())
    }
    return str;
}

interface IAxiosErrorResponse {
    data: {
        error: string
    }
}
export const extract = (cb: (t: string) => void) => (e: AxiosError) => {
    const { message, status, response } = e;

    if(parseInt(status) === 403 || response.status === 403){
        cb('Es necesario iniciar sesion nuevamente.')
    } else if(!e.response || (e.response && !e.response.data)){
        cb(message);
    } else {
        const response = e.response as IAxiosErrorResponse;
        cb(response.data.error);
    }
}

export default APIUrls