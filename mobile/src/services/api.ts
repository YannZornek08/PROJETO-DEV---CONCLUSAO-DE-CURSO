import axios from 'axios';

const api = axios.create({
    // baseURL: "http://localhost:3333"
    baseURL: 'http://10.210.188.51:3333'
})

export { api }