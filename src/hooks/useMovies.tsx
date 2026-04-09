import { useQuery } from "@tanstack/react-query";
import { getMovieDetails,  getMovieTrailer,  getTopRatedMovies, getTrendingMovies } from "../services/getMovies";

export function useTrendingMovies(){
    const {data} = useQuery({
        queryKey:["getTrendingMovies"],
        queryFn:getTrendingMovies
    })
    return data
}
export function useTopRatedMovies(){
    const {data} = useQuery({
        queryKey:["getTopRated"],
        queryFn:getTopRatedMovies
    })
    return data
}

export function useMovieDetails(id:string){
    const {data} = useQuery({
        queryKey:["getMovieDetails"],
        queryFn:()=>getMovieDetails(id)
    })
    return data
}
export function useMovieTrailer(id:string){
    const {data} = useQuery({
        queryKey:["getMovieDetails"],
        queryFn:()=>getMovieTrailer(id)
    })
    return data
}
