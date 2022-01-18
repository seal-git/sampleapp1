import axios from 'axios'

export const myAxios = axios.create({
    baseURL: '/yoshinari',
    // headers: {
    //     "Content-type": "application/json"
    // }
});