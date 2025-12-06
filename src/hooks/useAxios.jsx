import axios from "axios";

const secureInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

export default function useAxios(){
    return secureInstance;
}