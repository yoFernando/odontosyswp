import axios from "axios"
import { BASE_URL } from "./api";

const AxiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {'x-version': 100}
})

export const assignToken = (token: string) => AxiosClient.defaults.headers.common['x-auth'] = token;
export const unassingToken = () => delete AxiosClient.defaults.headers.common['x-auth'];

assignToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaW5pY2EiOjUsIlRpcG9EZVVzdWFyaW8iOjAsImlkVXN1YXJpbyI6MTYzOCwiaWF0IjoxNjY0NjQ0MjU3LCJleHAiOjE2NjUwNzYyNTd9.rBNOzizj0SyRkcMqwR8z-JJoOGkMv-AhLceNtfIZqKk')
export default AxiosClient;