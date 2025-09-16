import axios from 'axios';

const api = axios.create({
    // baseURL: "http://localhost:3333"
    baseURL: 'http://10.109.221.141:3333'
})

export { api }