import { AxiosRequestConfig } from "axios"
import axios from "./axios"

async function Fetch<T>(url: string, params?: AxiosRequestConfig){
    const { data } = await axios.get<T>(url, params)
    return data
}

export default Fetch