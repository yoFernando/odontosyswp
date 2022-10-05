export const BASE_URL = 'http://192.168.1.7:5000/api/v1'
// export const BASE_URL = 'https://odomagenes.herokuapp.com/api/v1/'

enum APIUrls {
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

export default APIUrls