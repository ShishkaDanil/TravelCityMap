import axios from "axios";

const baseUrl = 'http://127.0.0.1:5000/'

export const http = axios.create({
  baseURL: baseUrl,
});

console.log(baseUrl);

