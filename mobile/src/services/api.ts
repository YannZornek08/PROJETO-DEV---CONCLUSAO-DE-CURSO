import axios from 'axios';

const api = axios.create({
    // baseURL: "http://localhost:3333"
    baseURL: 'http://10.244.193.31:3333'
})

export { api }