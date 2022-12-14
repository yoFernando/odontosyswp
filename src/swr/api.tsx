export const BASE_URL = 'https://appbackend.odontosys.com/api/v1'
// export const BASE_URL = 'http://192.168.1.6:5000/api/v1'

enum APIUrls {
    login = `auth/login`,
    agendas = `agendas`,
    citas = `citas/$agenda/$year/$month/$day`
}

export function assign(uri: string, params: string[], values: string[]) {
    let str = uri;
    for (let i = 0; i < params.length; i++) {
        str = str.replace(params[i], values[i].toString())
    }
    return str;
}

export default APIUrls