import APIUrls from "./api"
import axios from "./axios"

async function Fetch<T>(url: APIUrls, params?: Object){
    const { data } = await axios.get<T>(url, params)
    return data
}

export default Fetch