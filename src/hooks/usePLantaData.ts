import axios, { AxiosPromise,AxiosResponse } from "axios"
import { PlantaData , PaginatedResponse } from "../interface/PlantaData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';
const fetchData = async(page: number, limit: number): Promise<PaginatedResponse<PlantaData>>  =>{
    const response: AxiosResponse<PaginatedResponse<PlantaData>> = await axios.get(API_URL+'/plantas',{
        params: {
            page,
            limit
        }
    });
    console.log('API Response:', response.data);  // Log para verificar a resposta
    
    return response.data;
}

export function usePLantaData(page: number, limit: number){
    const query = useQuery<PaginatedResponse<PlantaData>, Error>({
        queryFn: () => fetchData(page, limit),
        queryKey: ['planta-data', page, limit],
        retry:2
        
    })
    return {
        ...query,
        data: query.data?.content || [],
        totalPages: query.data?.totalPages || 0,
        totalElements: query.data?.totalElements || 0
    }


}