import APIUrls from "./api"
import axios from "./axios"

async function Fetch<T>(url: APIUrls){
    const { data } = await axios.get<T>(url)
    return data
}

export default Fetch