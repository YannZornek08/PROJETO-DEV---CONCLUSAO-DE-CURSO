import axios from 'axios';

const api = axios.create({
    // baseURL: "http://localhost:3333"
    baseURL: 'http://10.177.207.31:3333'
})

export { api }