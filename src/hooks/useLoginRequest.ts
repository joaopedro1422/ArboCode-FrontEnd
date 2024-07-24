import axios, { AxiosPromise } from "axios"
import { PlantaData } from "../interface/PlantaData";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginData } from "../interface/LoginData";

interface loginResponse{
    token:string,
    id:string
}
const API_URL = 'http://localhost:8080';
const postData = async(data: LoginData): AxiosPromise<loginResponse>  =>{
    const response = axios.post(API_URL+'/auth/login',data);
    return response;
}

export function useLoginRequest(){
    const mutate = useMutation({
        mutationFn: postData,
        retry:2,
    })
    return mutate;
}

