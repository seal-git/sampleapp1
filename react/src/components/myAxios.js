import axios from 'axios'

export const myAxios = axios.create({
    baseURL: '/',
    headers: {
        "Content-type": "application/json"
    }
});