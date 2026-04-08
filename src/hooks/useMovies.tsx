import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../services/getMovies";

export function useMovies(){
    const {data} = useQuery({
        queryKey:["getMovies"],
        queryFn:getMovies
    })
    return data
}